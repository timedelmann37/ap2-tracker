(() => {
  'use strict';

  const TRACKER_KEY = 'ap2-tracker-state-v1';
  const LEARNING_KEY = 'ap2-learning-state-v1';
  const progressId = document.body.dataset.progressId;
  const topicId = document.body.dataset.topicId;
  const saveNote = document.getElementById('learning-save');
  const CLOUD_URL = 'https://snwkmwevqmqulmexgxxr.supabase.co';
  const CLOUD_KEY = 'sb_publishable__EFtmQSsRJMyiWVYVNTGQA_rKx39rML';
  const cloud = window.supabase?.createClient(CLOUD_URL, CLOUD_KEY) || null;
  let cloudUser = null;
  let cloudTimer = null;
  let cloudSyncing = false;

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

  function setProgressEnabled(enabled) {
    document.getElementById('mark-done')?.toggleAttribute('disabled', !enabled);
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
      save(LEARNING_KEY, learning);
    });
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
  }

  for (const quiz of document.querySelectorAll('[data-quiz]')) {
    const key = `${topicId}:quiz:${quiz.dataset.quiz}`;
    const stored = learning[key];
    renderQuiz(quiz, Number.isInteger(stored) ? stored : undefined);
    for (const option of quiz.querySelectorAll('[data-answer]')) {
      option.addEventListener('click', () => {
        const selected = Number(option.dataset.answer);
        learning[key] = selected;
        save(LEARNING_KEY, learning);
        renderQuiz(quiz, selected);
      });
    }
    quiz.querySelector('[data-quiz-reset]')?.addEventListener('click', () => {
      delete learning[key];
      save(LEARNING_KEY, learning);
      renderQuiz(quiz, undefined);
    });
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
