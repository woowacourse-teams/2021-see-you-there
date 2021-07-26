export const INPUT = {
  PARTICIPANT: {
    NAME: {
      KEY: 'name',
      LABEL: '이름',
      PLACEHOLDER: `이름을 1 ~ 6자로 입력해주세요.`,
      MIN_LENGTH: 1,
      MAX_LENGTH: 6,
    },
    ADDRESS: {
      KEY: 'address',
      LABEL: '출발지',
      PLACEHOLDER: '출발지를 입력해주세요. ( Click )',
    },
  },

  USER_ADDRESS: {
    NAME: {
      KEY: 'name',
      LABEL: '주소 별명',
      PLACEHOLDER: '1 ~ 10자로 입력해주세요.',
      MIN_LENGTH: 1,
      MAX_LENGTH: 10,
    },
    ADDRESS: {
      KEY: 'address',
      LABEL: '주소지',
      PLACEHOLDER: '주소지를 입력해주세요. ( Click )',
    },
  },

  ADDRESS_SEARCH: {
    KEY: 'addressSearch',
    LABEL: '주소검색',
    PLACEHOLDER: '예) 여기동 42-1 또는 만나아파트',
  },
};

// TODO: 백엔드분들과 상의 후 MAX_LENGTH 유지할지 결정
export const PARTICIPANT = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 8,
};

export const MESSAGE = {
  PARTICIPANT: {
    NOTICE_NAME_TOO_LONG: `이름을 ${INPUT.PARTICIPANT.NAME.MAX_LENGTH}자 이하로만 입력 가능합니다.`,
    NOTICE_NAME_TOO_SHORT: `이름을 ${INPUT.PARTICIPANT.NAME.MIN_LENGTH}자 이상으로 입력해주세요.`,
    NOTICE_NAME_EMPTY: '참석자 이름을 입력해주세요.',
    NOTICE_INCOMPLETE_FORM: '참석자 정보를 입력해주세요.',

    CONFIRM_DELETE: '참석자를 삭제하시겠습니까?',
  },

  USER_ADDRESS: {
    NOTICE_NAME_TOO_LONG: `주소 별명을 ${INPUT.USER_ADDRESS.NAME.MAX_LENGTH}자 이하로만 입력 가능합니다.`,
    NOTICE_NAME_TOO_SHORT: `주소 별명을 ${INPUT.USER_ADDRESS.NAME.MIN_LENGTH}자 이상으로 입력해주세요.`,
    NOTICE_NAME_EMPTY: '주소 별명을 입력해주세요.',
    NOTICE_INCOMPLETE_FORM: '주소 정보를 입력해주세요.',

    CONFIRM_DELETE: '해당 주소를 삭제하시겠습니까?',
  },
};

export const POBI_POINT = { x: 127.10296, y: 37.515403, name: '어디서 만나?', tag: '포비 💙' };

export const STORAGE_KEY = {
  TOKEN: 'token',
  PARTICIPANT: 'p',
};
