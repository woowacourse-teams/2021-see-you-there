export const getId = (() => {
  let id = 0;

  return () => `${new Date().getTime()}${id++}`;
})();

export const getAvatarId = (() => {
  let avatarIndex = 1;

  return () => {
    if (avatarIndex > 10) {
      avatarIndex = 1;
    }
    return `avatar${avatarIndex++}`;
  };
})();

export const getKey = (() => {
  let tipIndex = 0;

  return (array) => {
    if (tipIndex === array.length) {
      tipIndex = 0;
    }
    return tipIndex++;
  };
})();

const adjectives = [
  '귀여운',
  '신나는',
  '총명한',
  '용맹한',
  '똑똑한',
  '다정한',
  '산뜻한',
  '위대한',
  '기묘한',
  '깔끔한',
  '확실한',
  '빛나는',
  '젠틀한',
  '멋있는',
  '듬직한',
  '친절한',
];

const animals = [
  '호랑이',
  '고양이',
  '꾀고리',
  '다람쥐',
  '개구리',
  '올빼미',
  '두루미',
  '코끼리',
  '부엉이',
  '거북이',
  '아기새',
  '오소리',
  '강아지',
  '두더지',
  '맹꽁이',
  '캥거루',
];

const nicknames = Array.from({ length: adjectives.length }).map(() => {
  const adjective = adjectives.splice(Math.floor(Math.random() * (adjectives.length - 1)), 1);
  const animal = animals.splice(Math.floor(Math.random() * (animals.length - 1)), 1);

  return adjective + animal;
});

export const getNickname = (() => {
  let nicknameIndex = 0;

  return () => {
    if (nicknameIndex >= nicknames.length) {
      nicknameIndex = 0;
    }
    return nicknames[nicknameIndex++];
  };
})();
