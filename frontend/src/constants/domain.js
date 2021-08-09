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

  USER_PROFILE: {
    NICKNAME: {
      KEY: 'nickname',
      LABEL: '별명',
      PLACEHOLDER: '1 ~ 10자로 입력해주세요.',
      MIN_LENGTH: 1,
      MAX_LENGTH: 10,
    },
    MEMBER_ID: {
      KEY: 'memberId',
      LABEL: '아이디',
      PLACEHOLDER: '아이디를 입력해주세요.',
      MIN_LENGTH: 1,
      MAX_LENGTH: 10,
    },
  },

  ADDRESS_SEARCH: {
    KEY: 'addressSearch',
    LABEL: '주소검색',
    PLACEHOLDER: '예) 여기동 42-1 또는 만나아파트',
  },

  FRIEND_SEARCH: {
    KEY: 'friendSearch',
    LABEL: '친구 아이디 검색',
    PLACEHOLDER: '친구의 아이디를 입력해주세요.',
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

    SNACKBAR_CREATE: '참석자가 추가되었습니다.',
    SNACKBAR_DELETE: '참석자가 삭제되었습니다.',
    SNACKBAR_MAX_PARTICIPANT: `참석자를 ${PARTICIPANT.MAX_LENGTH}명 이상 추가할 수 없습니다.`,
    SNACKBAR_MIN_PARTICIPANT: `참석자를 ${PARTICIPANT.MIN_LENGTH}명 이상 추가해주세요.`,
  },

  USER_ADDRESS: {
    NOTICE_NAME_TOO_LONG: `주소 별명을 ${INPUT.USER_ADDRESS.NAME.MAX_LENGTH}자 이하로만 입력 가능합니다.`,
    NOTICE_NAME_TOO_SHORT: `주소 별명을 ${INPUT.USER_ADDRESS.NAME.MIN_LENGTH}자 이상으로 입력해주세요.`,
    NOTICE_NAME_EMPTY: '주소 별명을 입력해주세요.',
    NOTICE_INCOMPLETE_FORM: '주소 정보를 입력해주세요.',

    CONFIRM_DELETE: '해당 주소를 삭제하시겠습니까?',

    SNACKBAR_CREATE: '주소가 추가되었습니다.', // 넣음
    SNACKBAR_UPDATE: '주소 정보가 수정되었습니다.', // 넣음
    SNACKBAR_DELETE: '주소가 삭제되었습니다.', // 넣음
  },

  USER_FRIEND: {
    CONFIRM_CANCEL: '친구 요청을 취소하시겠습니까?',
    CONFIRM_ACCEPT: '친구 요청을 수락하시겠습니까?',
    CONFIRM_ACCEPT_DETAIL: '친구가 되면 서로의 주소가 공개됩니다.',
    CONFIRM_REFUSE: '친구 요청을 거절하시겠습니까?',
    CONFIRM_DELETE: '해당 친구를 삭제하시겠습니까?',
    CONFIRM_DELETE_DETAIL: '친구를 삭제할 경우, 상대방의 친구 목록에서도 내가 삭제됩니다.',

    SNACKBAR_REQUEST: '친구 요청이 전송되었습니다.', //넣음
    SNACKBAR_CANCEL: '친구 요청이 취소되었습니다.', // 넣음
    SNACKBAR_ACCEPT: '친구 요청이 수락되었습니다.', // 넣음
    SNACKBAR_REFUSE: '친구 요청이 거절되었습니다.', // 넣음
    SNACKBAR_DELETE: '친구가 삭제되었습니다.', // 넣음
  },

  USER_PROFILE: {
    NOTICE_NICKNAME_TOO_LONG: `별명을 ${INPUT.USER_PROFILE.NICKNAME.MAX_LENGTH}자 이하로만 입력 가능합니다.`,
    NOTICE_NICKNAME_TOO_SHORT: `별명을 ${INPUT.USER_PROFILE.NICKNAME.MIN_LENGTH}자 이상으로 입력해주세요.`,
    NOTICE_NICKNAME_EMPTY: '별명을 입력해주세요.',

    NOTICE_MEMBER_ID_TOO_LONG: `아이디을 ${INPUT.USER_PROFILE.MEMBER_ID.MAX_LENGTH}자 이하로만 입력 가능합니다.`,
    NOTICE_MEMBER_ID_TOO_SHORT: `아이디을 ${INPUT.USER_PROFILE.MEMBER_ID.MIN_LENGTH}자 이상으로 입력해주세요.`,
    NOTICE_MEMBER_ID_EMPTY: '아이디을 입력해주세요.',

    NOTICE_INCOMPLETE_FORM: '프로필 정보를 입력해주세요.',
    NOTICE_NOT_UPDATED_FORM: '변경된 정보가 없습니다.',

    SNACKBAR_UPDATE: '프로필 정보가 수정되었습니다.', // 넣음
  },

  ERROR: {
    NETWORK: '네트워크 에러가 발생하였습니다.',
    INVALID_TOKEN: '로그인 정보가 만료되었습니다. 다시 로그인해주세요.',
  },
};

export const POBI_POINT = { x: 127.10296, y: 37.515403, name: '어디서 만나?', tag: '포비 💙' };

export const STORAGE_KEY = {
  TOKEN: 'token',
  PARTICIPANT: 'p',
};
