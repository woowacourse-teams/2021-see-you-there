export const getId = () => new Date();

let index = 1;

export const getAvatarKey = () => {
  if (index > 10) {
    index = 1;
  }
  return `avatar${index++}`;
};
