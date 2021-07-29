import { useState } from 'react';
// import { useQuery } from 'react-query';

import { httpRequest, getAvatarKey } from '../utils';
// import { API_URL, QUERY_KEY } from '../constants';
import { API_URL } from '../constants';
import { Image } from '../assets';

const mockFriendList = [
  {
    memberId: '365kim',
    nickname: '365kim',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: '0imbean0',
    nickname: '임심바',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'daum7766',
    nickname: '김멍토',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'hybeom0720',
    nickname: '와이빛',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
];

export const useFriendSearch = () => {
  const [memberIdKeyword, setMemberIdKeyword] = useState('');

  const fetchFriendSearch = async ({ queryKey }) => {
    const [_, keyword] = queryKey;
    const response = await httpRequest.get(API_URL.FRIEND_SEARCH(keyword));

    return await response.json();
  };

  // const { data: searchResult } = useQuery([QUERY_KEY.FRIEND_SEARCH, memberIdKeyword], fetchFriendSearch, {
  //   enabled: !!memberIdKeyword,
  // });

  const searchResult = mockFriendList.find(({ memberId }) => memberId === memberIdKeyword);

  return {
    searchResult,
    memberIdKeyword,
    setMemberIdKeyword,
  };
};
