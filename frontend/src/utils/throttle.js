export const throttle = (callback, delay) => {
  let timer;

  return function () {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      callback.apply(this, arguments);
    }, delay);
  };
};
