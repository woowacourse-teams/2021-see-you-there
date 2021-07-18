export const getLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);

    return JSON.parse(item);
  } catch (error) {
    console.error(error);

    return undefined;
  }
};

export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const removeLocalStorage = (key) => {
  return localStorage.removeItem(key);
};
