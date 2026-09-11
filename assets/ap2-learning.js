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
    const cardId = card.dataset.flashcard;
    const rating = [...document.querySelectorAll('.card-rating')]
      .find(container => container.querySelector(`[data-card-id="${cardId}"]`));
    card.classList.remove('is-flipped');
    card.setAttribute('aria-pressed', 'false');
    rating?.setAttribute('hidden', '');
    card.addEventListener('click', () => {
      const next = !card.classList.contains('is-flipped');
      card.classList.toggle('is-flipped', next);
      card.setAttribute('aria-pressed', String(next));
      rating?.toggleAttribute('hidden', !next);
      learning[`${topicId}:card-seen:${cardId}`] = true;
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
    if (due && due <= new Date().toISOString().slice(0, 10) && progressId && !tracker[`mark__${progressId}`]) {
      tracker[`mark__${progressId}`] = true;
      tracker[`ts__${progressId}`] = Date.now();
      saveTracker();
      renderProgress();
    }
  }

  function renderQuiz(quiz, selected) {
    const correct = Number(quiz.dataset.correct);
    const options = [...quiz.querySelectorAll('[data-answer]')];
    const feedback = quiz.querySelector('[data-feedback]');
    const hasAnswer = Number.isInteger(selected);
    const adaptive = options.every(option => option.dataset.rationale);
    const attempts = Number(learning[`${topicId}:attempts:${quiz.dataset.quiz}`] || 0);
    const revealCorrect = hasAnswer && (!adaptive || selected === correct || attempts >= 3);
    for (const option of options) {
      const answer = Number(option.dataset.answer);
      option.disabled = hasAnswer;
      option.classList.toggle('right', revealCorrect && answer === correct);
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
        const feedback = quiz.querySelector('[data-feedback]');
        if (feedback) {
          feedback.tabIndex = -1;
          feedback.focus({ preventScroll: true });
        }
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

  for (const recall of document.querySelectorAll('[data-recall]')) {
    const id = recall.dataset.recall;
    const input = recall.querySelector('[data-recall-input]');
    const reveal = recall.querySelector('[data-recall-reveal]');
    const model = recall.querySelector('[data-recall-model]');
    const count = recall.querySelector('[data-recall-count]');
    const key = `${topicId}:recall:${id}`;
    const revealedKey = `${key}:revealed`;
    if (input) input.value = learning[key] || '';
    const updateRecall = () => {
      const length = input?.value.trim().length || 0;
      if (count) count.textContent = `${length} Zeichen notiert`;
      reveal?.toggleAttribute('disabled', length < Number(recall.dataset.minLength || 20));
    };
    const showModel = () => {
      model?.removeAttribute('hidden');
      if (reveal) reveal.textContent = 'Muster ist eingeblendet';
    };
    if (learning[revealedKey]) showModel();
    input?.addEventListener('input', () => {
      learning[key] = input.value;
      save(LEARNING_KEY, learning);
      updateRecall();
    });
    reveal?.addEventListener('click', () => {
      learning[revealedKey] = true;
      save(LEARNING_KEY, learning);
      showModel();
    });
    updateRecall();
  }

  for (const practice of document.querySelectorAll('[data-numeric-practice]')) {
    const id = practice.dataset.numericPractice;
    const input = practice.querySelector('[data-numeric-input]');
    const checkButton = practice.querySelector('[data-numeric-check]');
    const feedback = practice.querySelector('[data-numeric-feedback]');
    const key = `${topicId}:numeric:${id}`;
    if (input && learning[`${key}:value`] !== undefined) input.value = learning[`${key}:value`];
    const renderNumeric = (result, value = input?.value) => {
      if (!feedback || !result) return;
      feedback.hidden = false;
      feedback.dataset.result = result;
      const normalizedValue = String(value || '').replace(',', '.');
      const specific = [...practice.querySelectorAll('[data-numeric-feedback-for]')]
        .find(item => item.dataset.numericFeedbackFor === normalizedValue);
      const correctTemplate = practice.querySelector('[data-numeric-correct]');
      const template = result === 'correct' ? correctTemplate : specific;
      feedback.replaceChildren();
      if (template?.content) feedback.append(template.content.cloneNode(true));
      else feedback.textContent = result === 'correct' ? practice.dataset.correctFeedback : practice.dataset.wrongFeedback;
    };
    renderNumeric(learning[`${key}:result`], learning[`${key}:value`]);
    checkButton?.addEventListener('click', () => {
      const value = Number(String(input?.value || '').replace(',', '.'));
      const expected = Number(practice.dataset.expected);
      const tolerance = practice.dataset.tolerance === undefined ? 0.001 : Number(practice.dataset.tolerance);
      const correct = Number.isFinite(value) && Number.isFinite(expected) && Number.isFinite(tolerance)
        && tolerance >= 0 && Math.abs(value - expected) <= tolerance;
      learning[`${key}:value`] = input?.value || '';
      learning[`${key}:result`] = correct ? 'correct' : 'wrong';
      learning[`${key}:attempts`] = Number(learning[`${key}:attempts`] || 0) + 1;
      save(LEARNING_KEY, learning);
      renderNumeric(learning[`${key}:result`], input?.value);
      feedback?.setAttribute('tabindex', '-1');
      feedback?.focus({ preventScroll: true });
      renderMastery();
    });
  }

  const raidRules = {
    0: { minimum: 2, capacity: n => n, tolerance: 'kein Laufwerksausfall' },
    1: { minimum: 2, capacity: () => 1, tolerance: 'ein Laufwerk im Spiegelpaar' },
    5: { minimum: 3, capacity: n => n - 1, tolerance: 'ein Laufwerksausfall' },
    6: { minimum: 4, capacity: n => n - 2, tolerance: 'zwei beliebige Laufwerksausfälle' },
    10: { minimum: 4, capacity: n => n / 2, tolerance: 'mindestens ein Laufwerk je Spiegelpaar' }
  };

  for (const lab of document.querySelectorAll('[data-raid-lab]')) {
    const id = lab.dataset.raidLab;
    const level = lab.querySelector('[data-raid-level]');
    const drives = lab.querySelector('[data-raid-drives]');
    const size = lab.querySelector('[data-raid-size]');
    const spares = lab.querySelector('[data-raid-spares]');
    const prediction = lab.querySelector('[data-raid-prediction]');
    const calculate = lab.querySelector('[data-raid-calculate]');
    const result = lab.querySelector('[data-raid-result]');
    const meter = lab.querySelector('[data-raid-meter]');
    const key = `${topicId}:raid-lab:${id}`;
    const stored = learning[key] || {};
    for (const [control, name] of [[level, 'level'], [drives, 'drives'], [size, 'size'], [spares, 'spares'], [prediction, 'prediction']]) {
      if (control && stored[name] !== undefined) control.value = stored[name];
    }
    calculate?.addEventListener('click', () => {
      const selected = Number(level?.value);
      const count = Number(drives?.value);
      const capacity = Number(String(size?.value || '').replace(',', '.'));
      const spareCount = Number(spares?.value || 0);
      const rule = raidRules[selected];
      const raid1Invalid = selected === 1 && count !== 2;
      if (!rule || !Number.isInteger(count) || count < rule.minimum || capacity <= 0 || raid1Invalid || (selected === 10 && count % 2)) {
        if (result) result.textContent = raid1Invalid
          ? 'RAID 1 wird in diesem AP2-Modell als Spiegelpaar mit exakt zwei aktiven Laufwerken berechnet.'
          : selected === 10 && count % 2
          ? 'RAID 10 benötigt für dieses Modell eine gerade Zahl aktiver Laufwerke.'
          : `Für RAID ${selected} werden mindestens ${rule?.minimum || 2} aktive Laufwerke und eine positive Kapazität benötigt.`;
        result?.setAttribute('data-result', 'invalid');
        return;
      }
      const usable = rule.capacity(count) * capacity;
      const gross = (count + spareCount) * capacity;
      const predictionRaw = String(prediction?.value || '').trim();
      const predicted = Number(predictionRaw.replace(',', '.'));
      const deltaText = predictionRaw && Number.isFinite(predicted)
        ? Math.abs(predicted - usable) < 0.001 ? ' Deine Vorhersage war richtig.' : ` Deine Vorhersage wich um ${Math.abs(predicted - usable).toLocaleString('de-DE')} TB ab.`
        : '';
      const spareText = spareCount ? ` ${spareCount} Hot Spare${spareCount === 1 ? '' : 's'} ${spareCount === 1 ? 'zählt' : 'zählen'} nicht zur Nutzkapazität.` : '';
      if (result) result.textContent = `${usable.toLocaleString('de-DE')} TB nutzbar bei ${gross.toLocaleString('de-DE')} TB eingebaut.${spareText} Toleranz: ${rule.tolerance}.${deltaText}`;
      result?.setAttribute('data-result', 'valid');
      if (meter) meter.style.transform = `scaleX(${Math.max(0, Math.min(1, usable / gross))})`;
      learning[key] = { level: level?.value, drives: drives?.value, size: size?.value, spares: spares?.value, prediction: prediction?.value, usable };
      save(LEARNING_KEY, learning);
    });
  }

  for (const simulator of document.querySelectorAll('[data-failure-simulator]')) {
    const id = simulator.dataset.failureSimulator;
    const level = Number(simulator.dataset.level);
    const driveCount = Number(simulator.dataset.drives);
    const bank = simulator.querySelector('[data-drive-bank]');
    const status = simulator.querySelector('[data-failure-status]');
    const reset = simulator.querySelector('[data-failure-reset]');
    const key = `${topicId}:failure-simulator:${id}`;
    let failed = new Set(Array.isArray(learning[key]) ? learning[key] : []);
    const isOperational = () => {
      if (level === 0) return failed.size === 0;
      if (level === 1) return failed.size < 2;
      if (level === 5) return failed.size <= 1;
      if (level === 6) return failed.size <= 2;
      if (level === 10) return ![...failed].some(index => failed.has(index % 2 ? index - 1 : index + 1));
      return false;
    };
    const renderSimulator = () => {
      for (const button of bank?.querySelectorAll('[data-drive-index]') || []) {
        const index = Number(button.dataset.driveIndex);
        const isFailed = failed.has(index);
        button.classList.toggle('is-failed', isFailed);
        button.setAttribute('aria-pressed', String(isFailed));
        button.querySelector('[data-drive-state]').textContent = isFailed ? 'ausgefallen' : 'aktiv';
      }
      const operational = isOperational();
      if (status) {
        status.dataset.state = operational ? failed.size ? 'degraded' : 'healthy' : 'failed';
        status.textContent = !failed.size
          ? `RAID ${level} ist vollständig redundant.`
          : operational
            ? `RAID ${level} arbeitet mit ${failed.size} Ausfall${failed.size === 1 ? '' : 'fällen'} degradiert weiter.`
            : level === 10
              ? 'Array ausgefallen: Beide Laufwerke desselben Spiegelpaars sind betroffen.'
              : `Array ausgefallen: RAID ${level} toleriert diese Anzahl Ausfälle nicht.`;
      }
    };
    for (let index = 0; index < driveCount; index += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'drive-toggle';
      button.dataset.driveIndex = String(index);
      button.innerHTML = `<span class="drive-number">${index + 1}</span><span data-drive-state>aktiv</span>${level === 10 ? `<small>Paar ${Math.floor(index / 2) + 1}</small>` : ''}`;
      button.addEventListener('click', () => {
        if (failed.has(index)) failed.delete(index);
        else failed.add(index);
        learning[key] = [...failed];
        save(LEARNING_KEY, learning);
        renderSimulator();
      });
      bank?.append(button);
    }
    reset?.addEventListener('click', () => {
      failed = new Set();
      learning[key] = [];
      save(LEARNING_KEY, learning);
      renderSimulator();
    });
    renderSimulator();
  }

  for (const sequence of document.querySelectorAll('[data-sequence]')) {
    const id = sequence.dataset.sequence;
    const list = sequence.querySelector('[data-sequence-list]');
    const checkButton = sequence.querySelector('[data-sequence-check]');
    const feedback = sequence.querySelector('[data-sequence-feedback]');
    const expected = sequence.dataset.expected.split(',');
    const key = `${topicId}:sequence:${id}`;
    const storedOrder = learning[`${key}:order`];
    if (Array.isArray(storedOrder)) {
      for (const stepId of storedOrder) {
        const step = list?.querySelector(`[data-step="${stepId}"]`);
        if (step) list.append(step);
      }
    }
    const saveSequence = () => {
      learning[`${key}:order`] = [...list.querySelectorAll('[data-step]')].map(step => step.dataset.step);
      save(LEARNING_KEY, learning);
    };
    const updateButtons = () => {
      const steps = [...list.querySelectorAll('[data-step]')];
      steps.forEach((step, index) => {
        step.querySelector('[data-move="up"]').disabled = index === 0;
        step.querySelector('[data-move="down"]').disabled = index === steps.length - 1;
        step.querySelector('[data-step-position]').textContent = `${index + 1}`;
      });
    };
    for (const step of list?.querySelectorAll('[data-step]') || []) {
      const controls = document.createElement('span');
      controls.className = 'sequence-controls';
      controls.innerHTML = '<button type="button" data-move="up">Hoch</button><button type="button" data-move="down">Runter</button>';
      step.append(controls);
      for (const button of controls.querySelectorAll('[data-move]')) {
        button.addEventListener('click', () => {
          if (button.dataset.move === 'up' && step.previousElementSibling) list.insertBefore(step, step.previousElementSibling);
          if (button.dataset.move === 'down' && step.nextElementSibling) list.insertBefore(step.nextElementSibling, step);
          saveSequence();
          updateButtons();
          step.focus();
        });
      }
    }
    checkButton?.addEventListener('click', () => {
      const current = [...list.querySelectorAll('[data-step]')].map(step => step.dataset.step);
      const firstWrong = current.findIndex((step, index) => step !== expected[index]);
      const correct = firstWrong === -1;
      learning[`${key}:correct`] = correct;
      learning[`${key}:attempts`] = Number(learning[`${key}:attempts`] || 0) + 1;
      saveSequence();
      if (feedback) {
        feedback.hidden = false;
        feedback.dataset.result = correct ? 'correct' : 'wrong';
        feedback.textContent = correct
          ? sequence.dataset.correctFeedback
          : `Noch nicht. Prüfe besonders Position ${firstWrong + 1}: ${sequence.dataset.wrongFeedback}`;
        feedback.tabIndex = -1;
        feedback.focus({ preventScroll: true });
      }
      renderMastery();
    });
    updateButtons();
  }

  function masteryState() {
    const required = [...document.querySelectorAll('[data-required-objective]')];
    if (!required.length) return { passed: true, completed: 0, total: 0 };
    const objectiveIds = [...new Set(required.map(item => item.dataset.requiredObjective))];
    const passedIds = objectiveIds.filter(objectiveId => required
      .filter(item => item.dataset.requiredObjective === objectiveId)
      .some(activity => {
        if (activity.dataset.quiz) return learning[`${topicId}:quiz:${activity.dataset.quiz}`] === Number(activity.dataset.correct);
        if (activity.dataset.numericPractice) return learning[`${topicId}:numeric:${activity.dataset.numericPractice}:result`] === 'correct';
        if (activity.dataset.sequence) return learning[`${topicId}:sequence:${activity.dataset.sequence}:correct`] === true;
        return false;
      }));
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
      if (bar) bar.style.transform = `scaleX(${state.completed / state.total})`;
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
