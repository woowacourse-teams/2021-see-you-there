import { useState, useContext } from 'react';
import { useQuery } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { API_URL, QUERY_KEY } from '../constants';

export const useFriendSearch = () => {
  const { token } = useContext(UserContext);
  const [memberIdKeyword, setMemberIdKeyword] = useState('');

  const fetchFriendSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpRequest.get(API_URL.FRIEND_SEARCH(keyword), { token });

    return await response.json();
  };

  const { data: results } = useQuery([QUERY_KEY.FRIEND_SEARCH, memberIdKeyword], fetchFriendSearch, {
    enabled: !!memberIdKeyword,
  });

  const searchResult = results?.[0];

  return {
    searchResult,
    memberIdKeyword,
    setMemberIdKeyword,
  };
};
