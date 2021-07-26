// export const API_DOMAIN = 'http://localhost:8080';
// export const API_END_POINT = 'http://localhost:8080/api';
export const API_DOMAIN = 'https://seeyouthere.o-r.kr';
export const API_END_POINT = 'https://seeyouthere.o-r.kr/api';

export const API_URL = {
  ADDRESS_SEARCH: (keyword) => `${API_END_POINT}/location/coordinate?address=${keyword}`,
  MIDPOINT: `${API_END_POINT}/location/midPoint`,
  CATEGORY: (category, { x, y }) => `${API_END_POINT}/location/utility/${category}?x=${x}&y=${y}`,
  LOGIN_KAKAO: `${API_END_POINT}/kakao/oauth`,
  LOGIN_NAVER: `${API_END_POINT}/naver/oauth`,
  TOKEN_VALIDATION: `${API_END_POINT}/members`,
};
