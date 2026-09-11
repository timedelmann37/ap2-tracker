(() => {
  'use strict';

  function mergeActivity(localActivity = {}, remoteActivity = {}) {
    const merged = { ...remoteActivity };
    for (const [day, count] of Object.entries(localActivity)) {
      merged[day] = Math.max(Number(count) || 0, Number(merged[day]) || 0);
    }
    return merged;
  }

  function mergeProgress(localState = {}, remoteState = {}) {
    const merged = { ...localState, ...remoteState };
    const progressIds = new Set();
    for (const key of [...Object.keys(localState), ...Object.keys(remoteState)]) {
      const match = /^ts__((?:ga1|ga2|wiso)-\d+__\d+)$/.exec(key);
      if (match) progressIds.add(match[1]);
    }

    for (const itemId of progressIds) {
      const timestampKey = `ts__${itemId}`;
      const localTimestamp = Number(localState[timestampKey]) || 0;
      const remoteTimestamp = Number(remoteState[timestampKey]) || 0;
      if (localTimestamp <= remoteTimestamp) continue;
      for (const key of [itemId, `mark__${itemId}`, timestampKey]) {
        if (key in localState) merged[key] = localState[key];
        else delete merged[key];
      }
    }

    merged.__activity = mergeActivity(localState.__activity, remoteState.__activity);
    return merged;
  }

  Object.defineProperty(window, 'AP2_mergeProgress', { value: mergeProgress });
})();
