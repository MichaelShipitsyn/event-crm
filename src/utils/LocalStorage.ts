export const LocalStorage = {
  getItem: (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return;
      }
      return JSON.parse(serializedState);
    } catch {}
  },

  setItem: (keyName: string, keyValue: string) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(keyValue));
      return true;
    } catch {}
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  },
};
