export const ROUTE = {
  HOME: { PATH: '/' },
  MIDPOINT: { NAME: '중간지점찾기', PATH: '/midpoint' },
  SHARE: { NAME: '결과공유', PATH: '/share' },

  LOGIN: { NAME: '로그인', PATH: '/login' },
  LOGIN_KAKAO: { NAME: '카카오 로그인', PATH: '/kakao/callback' },
  LOGIN_NAVER: { NAME: '네이버 로그인', PATH: '/naver/callback' },
  LOGOUT: { NAME: '로그아웃', PATH: '/logout' },

  WELCOME: { NAME: '최초 주소등록', PATH: '/welcome' },

  PROFILE: { NAME: '내 프로필', PATH: '/profile' },
  ADDRESS: { NAME: '내 주소관리', PATH: '/address' },
  FRIEND: { NAME: '내 친구관리', PATH: '/friend' },
  BOARD: { NAME: '문의 게시판', PATH: '/board' },

  ERROR: { NAME: '에러 페이지', PATH: '/error' },
  EXPIRED: { NAME: '만료 페이지', PATH: '/expired' },
  NOT_FOUND: { NAME: '404 페이지', PATH: '*' },
};

export const ROUTES = {
  OAUTH: [ROUTE.LOGIN, ROUTE.LOGOUT, ROUTE.LOGIN_KAKAO, ROUTE.WELCOME],
  PUBLIC: [ROUTE.HOME, ROUTE.MIDPOINT, ROUTE.LOGIN],
  PRIVATE: [ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND],

  CANNOT_GO_BACK: [ROUTE.HOME, ROUTE.LOGIN_KAKAO, ROUTE.LOGOUT, ROUTE.WELCOME],

  MAP_VIEW: [ROUTE.HOME, ROUTE.MIDPOINT],
  NO_MAP_VIEW: [ROUTE.LOGIN, ROUTE.LOGOUT, ROUTE.WELCOME, ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND],
};

export const PATHS = {
  OAUTH: ROUTES.OAUTH.map((route) => route.PATH),
  PUBLIC: ROUTES.PUBLIC.map((route) => route.PATH),
  PRIVATE: ROUTES.PRIVATE.map((route) => route.PATH),

  CANNOT_GO_BACK: ROUTES.CANNOT_GO_BACK.map((route) => route.PATH),

  MAP_VIEW: ROUTES.MAP_VIEW.map((route) => route.PATH),
  NO_MAP_VIEW: ROUTES.NO_MAP_VIEW.map((route) => route.PATH),
};
