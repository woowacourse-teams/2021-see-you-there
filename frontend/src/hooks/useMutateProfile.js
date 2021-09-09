import { useContext } from 'react';
import { useMutation } from 'react-query';

import { SnackbarContext, UserContext } from '../contexts';
import { API_URL, MESSAGE } from '../constants';

export const useMutateProfile = () => {
  const { httpAuthRequest, profileImage, setUser } = useContext(UserContext);
  const { enqueueSnackbar } = useContext(SnackbarContext);

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpAuthRequest({ method: 'put', url: API_URL.USER, body });

    return await response.json();
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: (data) => {
      setUser((prevState) => ({ ...prevState, ...data }));
      enqueueSnackbar(MESSAGE.USER_PROFILE.SNACKBAR_UPDATE);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const updateProfile = ({ nickname, memberId }) => {
    update.mutate({ nickname, memberId, profileImage });
  };

  return { updateProfile };
};
