import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, MESSAGE } from '../constants';

export const useMutateAddress = () => {
  const queryClient = useQueryClient();
  const { token, forceLogout } = useContext(UserContext);
  const { enqueueSnackbar } = useSnackbar();

  /* 추가 */
  const fetchCreation = async (body) => {
    const response = await httpRequest.post(API_URL.ADDRESS, { token, body });

    if (response.status === 401) {
      forceLogout();
    }
  };

  const creation = useMutation((body) => fetchCreation(body), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.USER_ADDRESS.SNACKBAR_CREATE);
      queryClient.invalidateQueries(QUERY_KEY.ADDRESS);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const createAddress = ({ nickname, address }) => {
    creation.mutate({ nickname, ...address });
  };

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpRequest.put(API_URL.ADDRESS, { token, body });

    if (response.status === 401) {
      forceLogout();
    }
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.USER_ADDRESS.SNACKBAR_UPDATE);
      queryClient.invalidateQueries(QUERY_KEY.ADDRESS);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const updateAddress = ({ id, nickname, address }) => {
    update.mutate({ ...address, id, nickname });
  };

  /* 삭제 */
  const fetchDeletion = async (body) => {
    const response = await httpRequest.delete(API_URL.ADDRESS, { token, body });

    if (response.status === 401) {
      forceLogout();
    }
  };

  const deletion = useMutation((body) => fetchDeletion(body), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.USER_ADDRESS.SNACKBAR_DELETE);
      queryClient.invalidateQueries(QUERY_KEY.ADDRESS);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const deleteAddress = (id) => {
    deletion.mutate({ id });
  };

  return { createAddress, updateAddress, deleteAddress };
};
