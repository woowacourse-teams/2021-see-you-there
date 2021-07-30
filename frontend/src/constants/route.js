export const ROUTE = {
  HOME: { PATH: '/' },
  MIDPOINT: { NAME: '중간지점찾기', PATH: '/midpoint' },

  LOGIN: { NAME: '로그인', PATH: '/login' },
  LOGIN_KAKAO: { NAME: '카카오 로그인', PATH: '/kakao/callback' },
  LOGIN_NAVER: { NAME: '네이버 로그인', PATH: '/naver/callback' },
  LOGOUT: { NAME: '로그아웃', PATH: '/logout' },

  WELCOME: { NAME: '최초 주소등록', PATH: '/welcome' },

  PROFILE: { NAME: '내 프로필', PATH: '/profile' },
  ADDRESS: { NAME: '내 주소관리', PATH: '/address' },
  FRIEND: { NAME: '내 친구관리', PATH: '/friend' },
  HISTORY: { NAME: '검색 히스토리', PATH: '/history' },
};

/* 원래 코드 */

export const PUBLIC_ROUTES = [ROUTE.HOME, ROUTE.MIDPOINT, ROUTE.LOGIN];
export const PRIVATE_ROUTES = [ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND, ROUTE.HISTORY];

export const OAUTH_ROUTES = [ROUTE.LOGIN, ROUTE.LOGOUT, ROUTE.LOGIN_KAKAO, ROUTE.WELCOME];

export const CANNOT_GO_BACK_ROUTES = [ROUTE.HOME, ROUTE.LOGIN_KAKAO, ROUTE.LOGOUT, ROUTE.WELCOME];

export const ROUTES_WITH_MAP = [ROUTE.HOME, ROUTE.MIDPOINT];
export const ROUTES_WITHOUT_MAP = [
  ROUTE.LOGIN,
  ROUTE.LOGOUT,
  ROUTE.WELCOME,
  ROUTE.PROFILE,
  ROUTE.ADDRESS,
  ROUTE.FRIEND,
  ROUTE.HISTORY,
];

/* TODO: 객체화해서 import */

export const ROUTES = {
  OAUTH: [ROUTE.LOGIN, ROUTE.LOGOUT, ROUTE.LOGIN_KAKAO, ROUTE.WELCOME],
  PUBLIC: [ROUTE.HOME, ROUTE.MIDPOINT, ROUTE.LOGIN],
  PRIVATE: [ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND, ROUTE.HISTORY],

  CANNOT_GO_BACK: [ROUTE.HOME, ROUTE.LOGIN_KAKAO, ROUTE.LOGOUT, ROUTE.WELCOME],

  MAP_VIEW: [ROUTE.HOME, ROUTE.MIDPOINT],
  NO_MAP_VIEW: [ROUTE.LOGIN, ROUTE.LOGOUT, ROUTE.WELCOME, ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND, ROUTE.HISTORY],
};

export const PATHS = {
  OAUTH: ROUTES.OAUTH.map((route) => route.PATH),
  PUBLIC: ROUTES.PUBLIC.map((route) => route.PATH),
  PRIVATE: ROUTES.PRIVATE.map((route) => route.PATH),

  CANNOT_GO_BACK: ROUTES.CANNOT_GO_BACK.map((route) => route.PATH),

  MAP_VIEW: ROUTES.MAP_VIEW.map((route) => route.PATH),
  NO_MAP_VIEW: ROUTES.NO_MAP_VIEW.map((route) => route.PATH),
};
