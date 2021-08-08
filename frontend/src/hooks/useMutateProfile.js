import { useContext } from 'react';
import { useMutation } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { API_URL, STATUS } from '../constants';

export const useMutateProfile = () => {
  const { token, forceLogout, profileImage, setUser } = useContext(UserContext);

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpRequest.put(API_URL.USER, { token, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: (data) => setUser((prevState) => ({ ...prevState, ...data })),
    onError: forceLogout,
  });

  const updateProfile = ({ nickname, memberId }) => {
    update.mutate({ nickname, memberId, profileImage });
  };

  return { updateProfile };
};
