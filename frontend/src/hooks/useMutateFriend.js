import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, STATUS } from '../constants';

export const useMutateFriend = () => {
  const { token, forceLogout } = useContext(UserContext);
  const queryClient = useQueryClient();

  /* 요청-취소 */ //TODO: 취소 구현
  const fetchCreation = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND_REQUEST, { token, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const request = useMutation((body) => fetchCreation(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.FRIEND),
    onError: forceLogout,
  });

  const requestFriend = (memberId) => {
    request.mutate({ memberId });
  };

  /* 수락-거절 */ //TODO: 수락,거절 구현

  /* 삭제 */
  const fetchDeletion = async (body) => {
    const response = await httpRequest.delete(API_URL.FRIEND_USER, { token, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const deletion = useMutation((body) => fetchDeletion(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.FRIEND),
    onError: forceLogout,
  });

  const deleteFriend = (memberId) => {
    deletion.mutate({ memberId });
  };

  return { requestFriend, deleteFriend };
};
