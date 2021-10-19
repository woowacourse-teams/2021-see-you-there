import { useState, useContext } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../contexts';
import { API_URL, QUERY_KEY } from '../constants';

export const useFriendSearch = () => {
  const { httpAuthRequest } = useContext(UserContext);
  const [memberIdKeyword, setMemberIdKeyword] = useState('');

  const fetchFriendSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpAuthRequest({ method: 'get', url: API_URL.FRIEND_SEARCH(keyword) });

    return await response.json();
  };

  const {
    data: searchResult,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useQuery([QUERY_KEY.FRIEND_SEARCH, memberIdKeyword], fetchFriendSearch, {
    enabled: !!memberIdKeyword,
  });

  return {
    searchResult,
    isLoading,
    isSuccess,
    isError,
    errorMessage: error?.message,

    memberIdKeyword,
    setMemberIdKeyword,
  };
};
