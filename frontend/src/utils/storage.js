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
    remove: (key, value) => localStorage.removeItem(key, JSON.stringify(value)),
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
    remove: (key, value) => sessionStorage.removeItem(key, JSON.stringify(value)),
  },
};
