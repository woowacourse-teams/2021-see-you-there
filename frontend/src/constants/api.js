const API_END_POINT = 'https://seeyouthere.o-r.kr/api';

export const API_URL = {
  ADDRESS_SEARCH: (keyword) => `${API_END_POINT}/location/coordinate?address=${keyword}`,
  MIDDLE_POINT: `${API_END_POINT}/location/middlePoint`,
};
