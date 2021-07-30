import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, STATUS } from '../constants';

export const useMutateProfile = () => {
  const { token, forceLogout, profileImage } = useContext(UserContext);
  const queryClient = useQueryClient();

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpRequest.put(API_URL.USER, { token, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.USER),
    onError: forceLogout,
  });

  const updateProfile = ({ nickname, memberId }) => {
    update.mutate({ nickname, memberId, profileImage });
  };

  return { updateProfile };
};
