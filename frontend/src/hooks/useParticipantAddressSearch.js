import { useState } from 'react';
import { useQuery } from 'react-query';

import { API_URL } from '../constants';
import { httpRequest } from '../utils';

const INITIAL_STATE = '';

export const useParticipantAddressSearch = () => {
  const [addressKeyword, setAddressKeyword] = useState(INITIAL_STATE);

  const fetchAddressSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const res = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

    return await res.json();
  };

  const { data } = useQuery(['주소검색', addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
    staleTime: Infinity,
  });

  const handleSubmitAddressSearch = (e) => {
    e.preventDefault();

    const keyword = e.target['addressSearch'].value;
    setAddressKeyword(keyword);
  };
  const resetAddressKeyword = () => setAddressKeyword(INITIAL_STATE);

  return { addressList: data, handleSubmitAddressSearch, setAddressKeyword, resetAddressKeyword };
};
