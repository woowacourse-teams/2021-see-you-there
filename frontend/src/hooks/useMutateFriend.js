import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import { UserContext } from '../contexts';
import { httpRequest } from '../utils';
import { QUERY_KEY, API_URL, MESSAGE } from '../constants';

export const useMutateFriend = () => {
  const { token, forceLogout } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /* 요청 */
  const fetchFriendRequest = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND_REQUEST, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const request = useMutation((body) => fetchFriendRequest(body), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.FRIEND_REQUEST);
      enqueueSnackbar(MESSAGE.USER_FRIEND.SNACKBAR_REQUEST);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const requestFriend = (memberId) => request.mutate({ memberId });

  /* 취소 */

  const fetchFriendCancel = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND_CANCEL, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const cancel = useMutation((body) => fetchFriendCancel(body), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.FRIEND_REQUEST);
      enqueueSnackbar(MESSAGE.USER_FRIEND.SNACKBAR_CANCEL);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const cancelFriend = (id) => cancel.mutate({ id });

  /* 수락 */

  const fetchFriendAccept = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND_ACCEPT, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const accept = useMutation((body) => fetchFriendAccept(body), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.FRIEND_RECEIVE);
      queryClient.invalidateQueries(QUERY_KEY.FRIEND);
      enqueueSnackbar(MESSAGE.USER_FRIEND.SNACKBAR_ACCEPT);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const acceptFriend = (id) => accept.mutate({ id });

  /* 거절 */

  const fetchFriendRefuse = async (body) => {
    const response = await httpRequest.post(API_URL.FRIEND_REFUSE, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const refuse = useMutation((body) => fetchFriendRefuse(body), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.FRIEND_RECEIVE);
      enqueueSnackbar(MESSAGE.USER_FRIEND.SNACKBAR_REFUSE);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const refuseFriend = (id) => refuse.mutate({ id });

  /* 삭제 */
  const fetchDeletion = async (body) => {
    const response = await httpRequest.delete(API_URL.FRIEND_USER, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      if (typeof response.body === 'object') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }
  };

  const deletion = useMutation((body) => fetchDeletion(body), {
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEY.FRIEND);
      enqueueSnackbar(MESSAGE.USER_FRIEND.SNACKBAR_DELETE);
    },
    onError: (error) => {
      enqueueSnackbar(error.message || MESSAGE.ERROR.NETWORK, { variant: 'error' });
    },
  });

  const deleteFriend = (memberId) => deletion.mutate({ memberId });

  return {
    requestFriend,
    cancelFriend,
    acceptFriend,
    refuseFriend,
    deleteFriend,
  };
};
