export const throttle = (callback, delay = 300) => {
  let timer;

  return function () {
    if (timer) return;

    timer = setTimeout(() => {
      timer = null;
      callback.apply(this, arguments);
    }, delay);
  };
};
