const API_END_POINT = 'https://seeyouthere.o-r.kr/api';

export const API_URL = {
  ADDRESS_SEARCH: (keyword) => `${API_END_POINT}/location/coordinate?address=${keyword}`,
  MIDPOINT: `${API_END_POINT}/location/midPoint`,
  CATEGORY: (category, { x, y }) => `${API_END_POINT}/location/utility/${category}?x=${x}&y=${y}`,
};
