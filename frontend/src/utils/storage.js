export const storage = {
  local: {
    get: (key) => {
      try {
        const item = localStorage.getItem(key);

        return JSON.parse(item);
      } catch (error) {
        console.error(error);

        return undefined;
      }
    },
    set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => localStorage.removeItem(key),
  },

  session: {
    get: (key) => {
      try {
        const item = sessionStorage.getItem(key);

        return JSON.parse(item);
      } catch (error) {
        console.error(error);

        return undefined;
      }
    },
    set: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    remove: (key) => sessionStorage.removeItem(key),
  },
};
