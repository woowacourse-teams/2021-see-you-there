import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, STATUS } from '../constants';

export const useMutateFriend = () => {
  const { token, forceLogout } = useContext(UserContext);
  const queryClient = useQueryClient();

  /* 추가 */
  const fetchCreation = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND, { token, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const creation = useMutation((body) => fetchCreation(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.FRIEND),
    onError: forceLogout,
  });

  const createFriend = (memberId) => {
    creation.mutate({ memberId });
  };

  /* 삭제 */
  const fetchDeletion = async (body) => {
    const response = await httpRequest.delete(API_URL.FRIEND, { token, body });

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

  return { createFriend, deleteFriend };
};
