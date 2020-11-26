export const LocalStorage = {
  getItem: (key: string) => {
    try {
      const serializedState = localStorage.getItem(key);
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  },

  setItem: (keyName: string, keyValue: string) => {
    try {
      localStorage.setItem(keyName, JSON.stringify(keyValue));
      return true;
    } catch (error) {
      return undefined;
    }
  },

  removeItem: (key: string) => {
    localStorage.removeItem(key);
  }
};
