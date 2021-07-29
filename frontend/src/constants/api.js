// export const API_DOMAIN = 'http://localhost:8080';
// export const API_END_POINT = 'http://localhost:8080/api';
export const API_DOMAIN = 'https://seeyouthere.o-r.kr';
export const API_END_POINT = 'https://seeyouthere.o-r.kr/api';

export const API_URL = {
  ADDRESS_SEARCH: (keyword) => `${API_END_POINT}/locations/coordinate?address=${keyword}`,
  MIDPOINT: `${API_END_POINT}/locations/midPoint`,
  CATEGORY: (category, { x, y }) => `${API_END_POINT}/locations/utility/${category}?x=${x}&y=${y}`,

  LOGIN_KAKAO: `${API_END_POINT}/kakao/oauth`,
  LOGIN_NAVER: `${API_END_POINT}/naver/oauth`,
  TOKEN_VALIDATION: `${API_END_POINT}/members`,

  ADDRESS: `${API_END_POINT}/members/address`,
  FRIEND: `${API_END_POINT}/members/friends`,
  FRIEND_SEARCH: `${API_END_POINT}/members/friends`, //TODO: API 생성 후 확인 필요
};

export const QUERY_KEY = {
  MIDPOINT: '중간지점',
  STATION: '지하철역',
  DEFAULT: '전체보기',
  CAFE: '카페',
  DINING: '음식점',
  PARTY: '문화시설',

  ADDRESS_SEARCH: '주소검색',

  TOKEN_VALIDATION: '토큰 유효성검사',
  O_AUTH: '소셜로그인',

  ADDRESS: '내 주소목록',
  FRIEND: '내 친구목록',
};

export const STATUS = {
  INVALID_TOKEN_ERROR: 401,
};
