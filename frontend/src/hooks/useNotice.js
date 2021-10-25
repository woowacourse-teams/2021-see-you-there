import { useQuery } from 'react-query';

import { API_URL, QUERY_KEY, STORAGE_KEY } from '../constants';
import { httpRequest, storage } from '../utils';

export const useNotice = () => {
  const isNewVisit = !storage.session.get(STORAGE_KEY.NOTICE);

  const fetchNotice = async () => {
    const response = await httpRequest.get(API_URL.NOTICE);

    return await response.json();
  };

  const { data } = useQuery([QUERY_KEY.NOTICE], fetchNotice, {
    enabled: isNewVisit,
  });

  // 현재 백엔드 API 응답이 배열 형태라, 우선 가장 최신 공지사항만 표시하도록 0번째 인덱스 반환
  return data?.[0];
};
