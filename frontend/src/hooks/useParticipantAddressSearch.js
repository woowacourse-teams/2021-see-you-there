import { useContext } from 'react';
import { useQuery } from 'react-query';

import { ParticipantAddFormContext } from '../contexts';
import { API_URL } from '../constants';
import { httpRequest } from '../utils';

export const useParticipantAddressSearch = () => {
  const { addressKeyword, setAddressKeyword, setAddress, escapeModal } = useContext(ParticipantAddFormContext);

  const fetchAddressSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const res = await httpRequest.get(API_URL.ADDRESS_SEARCH(keyword));

    return await res.json();
  };

  const { data } = useQuery(['주소검색', addressKeyword], fetchAddressSearch, {
    enabled: !!addressKeyword,
    staleTime: Infinity,
  });

  const handleSubmitAddressKeyword = (e) => {
    e.preventDefault();

    const keyword = e.target['addressSearch'].value;

    setAddressKeyword(keyword);
  };

  const handleSelectAddressListItem = (address) => {
    setAddress(address);
    escapeModal();
  };

  return {
    addressList: data,
    handleSubmitAddressKeyword,
    handleSelectAddressListItem,
  };
};
