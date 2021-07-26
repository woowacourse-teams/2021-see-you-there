import { useContext } from 'react';
import { useQuery } from 'react-query';

import { AddFormContext } from '../contexts';
import { API_URL } from '../constants';
import { httpRequest } from '../utils';

export const useAddressSearch = () => {
  const { addressKeyword, setAddressKeyword, setAddress } = useContext(AddFormContext);

  const fetchAddressSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

    return await response.json();
  };

  const { data: addressList } = useQuery(['주소검색', addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
    staleTime: Infinity,
  });

  return {
    addressList,
    setAddressKeyword,
    setAddress,
  };
};
