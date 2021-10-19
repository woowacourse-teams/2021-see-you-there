import { useContext } from 'react';
import { useQuery } from 'react-query';

import { AddFormContext } from '../contexts';
import { API_URL, QUERY_KEY } from '../constants';
import { httpRequest } from '../utils';

export const useAddressSearch = () => {
  const { addressKeyword, setAddressKeyword, setAddress } = useContext(AddFormContext);

  const fetchAddressSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

    return await response.json();
  };

  const { data: addressList } = useQuery([QUERY_KEY.ADDRESS_SEARCH, addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
  });

  return {
    addressList,
    setAddressKeyword,
    setAddress,
  };
};
