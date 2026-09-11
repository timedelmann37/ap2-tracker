import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { compileUnitSpec } from './learning/compile-unit-spec.mjs';

export async function loadCompiledUnitSpecs(specRoot) {
  let files = [];
  try {
    files = (await readdir(specRoot)).filter(file => file.endsWith('.unit.json')).sort();
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  return Promise.all(files.map(async file => {
    const raw = await readFile(path.join(specRoot, file), 'utf8');
    let spec;
    try {
      spec = JSON.parse(raw);
    } catch (error) {
      throw new Error(`${file}: ungültiges JSON (${error.message}).`);
    }
    return { file, raw, ...compileUnitSpec(spec, file) };
  }));
}
