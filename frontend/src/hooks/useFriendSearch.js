import { useState, useContext } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { API_URL, QUERY_KEY } from '../constants';

export const useFriendSearch = () => {
  const { token, forceLogout } = useContext(UserContext);
  const [memberIdKeyword, setMemberIdKeyword] = useState('');

  const fetchFriendSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpRequest.get(API_URL.FRIEND_SEARCH(keyword), { token });

    if (response.status === 401) {
      forceLogout();
      return;
    }
    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

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
