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
    // TODO: 아래 새로 추가된 에러처리 => 다른 코드에도 적용할지 추후 검토
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
