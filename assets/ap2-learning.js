(() => {
  'use strict';

  const TRACKER_KEY = 'ap2-tracker-state-v1';
  const LEARNING_KEY = 'ap2-learning-state-v1';
  const progressId = document.body.dataset.progressId;
  const topicId = document.body.dataset.topicId;
  const contentRevision = document.body.dataset.contentRevision || 'legacy';
  const saveNote = document.getElementById('learning-save');
  const CLOUD_URL = 'https://snwkmwevqmqulmexgxxr.supabase.co';
  const CLOUD_KEY = 'sb_publishable__EFtmQSsRJMyiWVYVNTGQA_rKx39rML';
  const cloud = window.supabase?.createClient(CLOUD_URL, CLOUD_KEY) || null;
  let cloudUser = null;
  let cloudTimer = null;
  let cloudSyncing = false;
  // Local learning must remain usable when the optional cloud client is unavailable.
  let cloudReady = true;

  function load(key) {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  }

  function save(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      if (saveNote) saveNote.textContent = key === TRACKER_KEY ? 'lokal gespeichert' : 'gespeichert';
      return true;
    } catch {
      if (saveNote) saveNote.textContent = 'Speichern nicht verfügbar';
      return false;
    }
  }

  let tracker = load(TRACKER_KEY);
  let learning = load(LEARNING_KEY);

  const revisionKey = `${topicId}:content-revision`;
  if (learning[revisionKey] && learning[revisionKey] !== contentRevision) {
    for (const key of Object.keys(learning)) {
      if (key.startsWith(`${topicId}:`) && key !== revisionKey) delete learning[key];
    }
    if (progressId && tracker[progressId]) {
      tracker[`mark__${progressId}`] = true;
      tracker[`ts__${progressId}`] = Date.now();
      save(TRACKER_KEY, tracker);
    }
  }
  learning[revisionKey] = contentRevision;
  save(LEARNING_KEY, learning);

  function setProgressEnabled(enabled) {
    cloudReady = enabled;
    renderMastery();
    document.getElementById('mark-rep')?.toggleAttribute('disabled', !enabled);
  }

  function mergeTracker(localState, remoteState) {
    return window.AP2_mergeProgress
      ? window.AP2_mergeProgress(localState, remoteState)
      : { ...localState, ...remoteState };
  }

  function scheduleCloudPush() {
    if (!cloud || !cloudUser) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(pushTrackerToCloud, 700);
  }

  async function pushTrackerToCloud() {
    if (!cloud || !cloudUser || cloudSyncing) return;
    cloudSyncing = true;
    const { error } = await cloud.from('progress').upsert(
      { user_id: cloudUser.id, state: tracker, updated_at: new Date().toISOString() },
      { onConflict: 'user_id' }
    );
    cloudSyncing = false;
    if (saveNote) saveNote.textContent = error ? 'Cloud-Sync fehlgeschlagen' : 'synchronisiert';
    if (error) console.error('Cloud-Sync fehlgeschlagen:', error.message);
  }

  function saveTracker() {
    if (save(TRACKER_KEY, tracker)) scheduleCloudPush();
  }

  function logActivity() {
    const date = new Date();
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    tracker.__activity ||= {};
    tracker.__activity[key] = (tracker.__activity[key] || 0) + 1;
  }

  function renderProgress() {
    if (!progressId) return;
    const done = Boolean(tracker[progressId]);
    const marked = Boolean(tracker[`mark__${progressId}`]);
    const doneButton = document.getElementById('mark-done');
    const markButton = document.getElementById('mark-rep');
    const status = document.querySelector('[data-topic-status]');
    const railStatus = document.querySelector('[data-rail-status]');

    doneButton?.classList.toggle('done', done);
    doneButton?.setAttribute('aria-pressed', String(done));
    if (doneButton) doneButton.textContent = done ? 'Gelernt' : 'Als gelernt markieren';
    markButton?.classList.toggle('on', marked);
    markButton?.setAttribute('aria-pressed', String(marked));
    if (markButton) markButton.textContent = marked ? 'Wiederholung vorgemerkt' : 'Zur Wiederholung';
    status?.classList.toggle('is-done', done);
    if (status) status.textContent = done ? 'gelernt' : 'noch offen';
    if (railStatus) railStatus.textContent = done ? 'Dieses Kernthema ist gelernt' : 'Dieses Kernthema ist offen';
  }

  document.getElementById('mark-done')?.addEventListener('click', () => {
    if (!masteryState().passed && !tracker[progressId]) return;
    const wasDone = Boolean(tracker[progressId]);
    tracker[progressId] = !wasDone;
    tracker[`ts__${progressId}`] = Date.now();
    if (!wasDone) logActivity();
    saveTracker();
    renderProgress();
  });

  document.getElementById('mark-rep')?.addEventListener('click', () => {
    const key = `mark__${progressId}`;
    tracker[key] = !tracker[key];
    tracker[`ts__${progressId}`] = Date.now();
    saveTracker();
    renderProgress();
  });

  for (const card of document.querySelectorAll('[data-flashcard]')) {
    const key = `${topicId}:card:${card.dataset.flashcard}`;
    const flipped = Boolean(learning[key]);
    card.classList.toggle('is-flipped', flipped);
    card.setAttribute('aria-pressed', String(flipped));
    card.addEventListener('click', () => {
      const next = !card.classList.contains('is-flipped');
      card.classList.toggle('is-flipped', next);
      card.setAttribute('aria-pressed', String(next));
      learning[key] = next;
      learning[`${topicId}:card-seen:${card.dataset.flashcard}`] = true;
      save(LEARNING_KEY, learning);
      renderMastery();
    });
  }

  for (const button of document.querySelectorAll('[data-card-rate]')) {
    const cardId = button.dataset.cardId;
    button.addEventListener('click', () => {
      const rating = button.dataset.cardRate;
      const days = rating === 'known' ? 4 : 1;
      const due = new Date();
      due.setDate(due.getDate() + days);
      learning[`${topicId}:card-rating:${cardId}`] = rating;
      learning[`${topicId}:review-due:${cardId}`] = due.toISOString().slice(0, 10);
      save(LEARNING_KEY, learning);
      const status = document.querySelector(`[data-card-review-status="${cardId}"]`);
      if (status) status.textContent = `Wiederholung am ${due.toLocaleDateString('de-DE')}`;
      for (const peer of document.querySelectorAll(`[data-card-id="${cardId}"][data-card-rate]`)) {
        peer.classList.toggle('selected', peer === button);
        peer.setAttribute('aria-pressed', String(peer === button));
      }
      renderMastery();
    });
    const storedRating = learning[`${topicId}:card-rating:${cardId}`];
    button.classList.toggle('selected', storedRating === button.dataset.cardRate);
    button.setAttribute('aria-pressed', String(storedRating === button.dataset.cardRate));
    const due = learning[`${topicId}:review-due:${cardId}`];
    const status = document.querySelector(`[data-card-review-status="${cardId}"]`);
    if (due && status) status.textContent = `Wiederholung am ${new Date(`${due}T12:00:00`).toLocaleDateString('de-DE')}`;
  }

  function renderQuiz(quiz, selected) {
    const correct = Number(quiz.dataset.correct);
    const options = [...quiz.querySelectorAll('[data-answer]')];
    const feedback = quiz.querySelector('[data-feedback]');
    const hasAnswer = Number.isInteger(selected);
    for (const option of options) {
      const answer = Number(option.dataset.answer);
      option.disabled = hasAnswer;
      option.classList.toggle('right', hasAnswer && answer === correct);
      option.classList.toggle('wrong', hasAnswer && answer === selected && selected !== correct);
    }
    if (feedback) feedback.hidden = !hasAnswer;
    const selectedOption = options.find(option => Number(option.dataset.answer) === selected);
    const rationale = feedback?.querySelector('[data-selected-feedback]');
    if (rationale) rationale.textContent = hasAnswer ? selectedOption?.dataset.rationale || '' : '';
  }

  for (const quiz of document.querySelectorAll('[data-quiz]')) {
    const key = `${topicId}:quiz:${quiz.dataset.quiz}`;
    const stored = learning[key];
    renderQuiz(quiz, Number.isInteger(stored) ? stored : undefined);
    for (const option of quiz.querySelectorAll('[data-answer]')) {
      option.addEventListener('click', () => {
        const selected = Number(option.dataset.answer);
        learning[key] = selected;
        learning[`${topicId}:attempts:${quiz.dataset.quiz}`] = Number(learning[`${topicId}:attempts:${quiz.dataset.quiz}`] || 0) + 1;
        save(LEARNING_KEY, learning);
        renderQuiz(quiz, selected);
        renderMastery();
      });
    }
    quiz.querySelector('[data-quiz-reset]')?.addEventListener('click', () => {
      delete learning[key];
      save(LEARNING_KEY, learning);
      renderQuiz(quiz, undefined);
      renderMastery();
    });
  }

  for (const hint of document.querySelectorAll('details[data-hint]')) {
    hint.addEventListener('toggle', () => {
      if (!hint.open) return;
      learning[`${topicId}:hint-used:${hint.dataset.hint}`] = true;
      save(LEARNING_KEY, learning);
    });
  }

  function masteryState() {
    const required = [...document.querySelectorAll('[data-required-objective]')];
    if (!required.length) return { passed: true, completed: 0, total: 0 };
    const objectiveIds = [...new Set(required.map(item => item.dataset.requiredObjective))];
    const passedIds = objectiveIds.filter(objectiveId => required
      .filter(item => item.dataset.requiredObjective === objectiveId)
      .some(quiz => learning[`${topicId}:quiz:${quiz.dataset.quiz}`] === Number(quiz.dataset.correct)));
    return { passed: passedIds.length === objectiveIds.length, completed: passedIds.length, total: objectiveIds.length };
  }

  function renderMastery() {
    const state = masteryState();
    const button = document.getElementById('mark-done');
    const count = document.querySelector('[data-mastery-count]');
    const bar = document.querySelector('[data-mastery-bar]');
    const note = document.querySelector('[data-mastery-note]');
    if (state.total === 0) {
      document.querySelector('[data-mastery-box]')?.setAttribute('hidden', '');
    } else {
      document.querySelector('[data-mastery-box]')?.removeAttribute('hidden');
      if (count) count.textContent = `${state.completed} von ${state.total} Pflichtzielen bestanden`;
      if (bar) bar.style.width = `${(state.completed / state.total) * 100}%`;
      if (note) note.textContent = state.passed ? 'Beide Lernziele sind nachgewiesen.' : 'Bestehe die gekennzeichneten Lernziel-Checks.';
    }
    const canToggle = state.passed || Boolean(tracker[progressId]);
    button?.toggleAttribute('disabled', !cloudReady || !canToggle);
    if (button && !canToggle) button.title = 'Erst nach bestandenen Pflichtzielen verfügbar';
    else button?.removeAttribute('title');
  }

  const progress = document.getElementById('rp');
  function updateReadingProgress() {
    if (!progress) return;
    const root = document.documentElement;
    const max = root.scrollHeight - root.clientHeight;
    progress.style.width = `${max > 0 ? (root.scrollTop / max) * 100 : 0}%`;
  }
  addEventListener('scroll', updateReadingProgress, { passive: true });
  updateReadingProgress();

  const tocLinks = [...document.querySelectorAll('.toc a[data-t]')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        for (const link of tocLinks) link.classList.toggle('active', link.dataset.t === entry.target.id);
      }
    }, { rootMargin: '-35% 0px -60% 0px' });
    for (const link of tocLinks) {
      const section = document.getElementById(link.dataset.t);
      if (section) observer.observe(section);
    }
  }

  addEventListener('storage', event => {
    if (event.key !== TRACKER_KEY) return;
    tracker = load(TRACKER_KEY);
    renderProgress();
  });

  renderProgress();
  renderMastery();

  async function initCloudBridge() {
    if (!cloud || !progressId) return;
    setProgressEnabled(false);
    try {
      const { data: sessionData } = await cloud.auth.getSession();
      cloudUser = sessionData?.session?.user || null;
      if (cloudUser) {
        const { data, error } = await cloud.from('progress').select('state').eq('user_id', cloudUser.id).maybeSingle();
        if (error) throw error;
        tracker = mergeTracker(tracker, data?.state || {});
        save(TRACKER_KEY, tracker);
        renderProgress();
        await pushTrackerToCloud();
      }
      cloud.auth.onAuthStateChange((event, session) => {
        cloudUser = event === 'SIGNED_OUT' ? null : session?.user || cloudUser;
      });
    } catch (error) {
      console.error('Cloud-Fortschritt konnte nicht geladen werden:', error.message);
      if (saveNote) saveNote.textContent = 'lokal gespeichert';
    } finally {
      setProgressEnabled(true);
    }
  }

  initCloudBridge();
})();
