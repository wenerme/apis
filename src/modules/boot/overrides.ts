const key = 'ImportOverrides';

export async function loadImportOverrides(): Promise<Record<string, string>> {
  try {
    return JSON.parse(localStorage[key] || '{}');
  } catch (e) {
    console.error(`failed to load overrides`, e);
  }
  return {};
}

export async function persistImportOverrides(overrides) {
  localStorage[key] = JSON.stringify(overrides);
}
