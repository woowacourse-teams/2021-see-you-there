import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { API_URL, MESSAGE } from '../constants';

export const useMutateProfile = () => {
  const { token, forceLogout, profileImage, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpRequest.put(API_URL.USER, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }
    return await response.json();
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: (data) => {
      setUser((prevState) => ({ ...prevState, ...data }));
      enqueueSnackbar(MESSAGE.USER_PROFILE.SNACKBAR_UPDATE);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const updateProfile = ({ nickname, memberId }) => {
    update.mutate({ nickname, memberId, profileImage });
  };

  return { updateProfile };
};
