import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import { UserContext } from '../contexts';
import { QUERY_KEY, API_URL, MESSAGE } from '../constants';

export const useMutateAddress = () => {
  const { httpAuthRequest } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /* 추가 */
  const fetchCreation = async (body) => {
    await httpAuthRequest({ method: 'post', url: API_URL.ADDRESS, body });
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
    await httpAuthRequest({ method: 'put', url: API_URL.ADDRESS, body });
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
    await httpAuthRequest({ method: 'delete', url: API_URL.ADDRESS, body });
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
