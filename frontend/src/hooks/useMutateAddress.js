import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, STATUS } from '../constants';

export const useMutateAddress = () => {
  const { token: accessToken, forceLogout } = useContext(UserContext);
  const queryClient = useQueryClient();

  /* 추가 */
  const fetchCreation = async (body) => {
    const response = await httpRequest.post(API_URL.ADDRESS, { accessToken, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const creation = useMutation((body) => fetchCreation(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.ADDRESS),
    onError: forceLogout,
  });

  const createAddress = ({ nickname, address }) => {
    creation.mutate({ nickname, ...address });
  };

  /* 수정 */
  const fetchUpdate = async (body) => {
    const response = await httpRequest.delete(API_URL.ADDRESS, { accessToken, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const update = useMutation((body) => fetchUpdate(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.ADDRESS),
    onError: forceLogout,
  });

  const updateAddress = ({ id, nickname, address }) => {
    update.mutate({ id, nickname, ...address });
  };

  /* 삭제 */
  const fetchDeletion = async (body) => {
    const response = await httpRequest.delete(API_URL.ADDRESS, { accessToken, body });

    if (response.status === 401) {
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
  };

  const deletion = useMutation((body) => fetchDeletion(body), {
    onSuccess: () => queryClient.invalidateQueries(QUERY_KEY.ADDRESS),
    onError: forceLogout,
  });

  const deleteAddress = (id) => {
    deletion.mutate({ id });
  };

  return { createAddress, updateAddress, deleteAddress };
};
