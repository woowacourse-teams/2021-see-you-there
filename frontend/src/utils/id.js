let id = 0;
export const getId = () => `${new Date().getTime()}${id++}`;

let avatarIndex = 1;

export const getAvatarKey = () => {
  if (avatarIndex > 10) {
    avatarIndex = 1;
  }
  return `avatar${avatarIndex++}`;
};

let tipIndex = 0;

export const getKey = (array) => {
  if (tipIndex === array.length) {
    tipIndex = 0;
  }
  return tipIndex++;
};

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

const nicknames = adjectives.map((v) => v + animals.splice(Math.floor(Math.random() * (animals.length - 1)), 1));

let nicknameIndex = 0;

export const getNickname = () => {
  if (nicknameIndex >= nicknames.length) {
    nicknameIndex = 0;
  }
  return nicknames[nicknameIndex];
};
