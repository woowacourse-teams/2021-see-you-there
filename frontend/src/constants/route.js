export const ROUTE = {
  HOME: { PATH: '/' },
  MIDPOINT: { NAME: '중간지점찾기', PATH: '/midpoint' },
  LOGIN: { NAME: '로그인', PATH: '/login' },

  LOGIN_KAKAO: { NAME: '카카오 로그인', PATH: '/kakao/callback' },
  LOGIN_NAVER: { NAME: '네이버 로그인', PATH: '/naver/callback' },

  LOGOUT: { NAME: '로그아웃', PATH: '/logout' },
  WELCOME: { NAME: '최초 주소등록', PATH: '/welcome' },
  PROFILE: { NAME: '내 프로필', PATH: '/profile' },
  FOLLOWER: { NAME: '내 팔로워', PATH: '/follower' },
  FOLLOWING: { NAME: '내 팔로잉', PATH: '/following' },
  HISTORY: { NAME: '검색 히스토리', PATH: '/history' },
};

export const PUBLIC_ROUTES = [ROUTE.HOME, ROUTE.MIDPOINT, ROUTE.LOGIN];
export const PUBLIC_PATHS = PUBLIC_ROUTES.map((route) => route.PATH);
export const PRIVATE_ROUTES = [ROUTE.PROFILE, ROUTE.ADDRESS, ROUTE.FRIEND, ROUTE.HISTORY];
export const PRIVATE_PATHS = PRIVATE_ROUTES.map((route) => route.PATH);

export const ROUTES_WITH_MAP = [ROUTE.HOME, ROUTE.MIDPOINT];
export const ROUTES_WITHOUT_MAP = [
  ROUTE.LOGIN,
  ROUTE.LOGOUT,
  ROUTE.WELCOME,
  ROUTE.PROFILE,
  ROUTE.FOLLOWER,
  ROUTE.FOLLOWING,
  ROUTE.HISTORY,
];
