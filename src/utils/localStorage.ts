export const getLocalStorageValue = <T = unknown>(key: string): T | null => {
  const storageValue = localStorage.getItem(key);
  if (!storageValue) return null;

  try {
    return JSON.parse(storageValue) as T;
  } catch (e) {
    console.error(`Error parsing localStorage key "${key}":`, e);
    return null;
  }
};

export const setLocalStorageValue = (key: string, value: unknown) => {
  if (value === undefined) return;

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error setting localStorage key "${key}":`, e);
  }
};
