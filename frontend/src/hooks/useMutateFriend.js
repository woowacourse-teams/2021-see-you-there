import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useSnackbar } from 'notistack';

import { UserContext } from '../contexts';
import { QUERY_KEY, API_URL, MESSAGE } from '../constants';

export const useMutateFriend = () => {
  const { httpAuthRequest } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  /* 요청 */
  const fetchFriendRequest = async (body) => {
    await httpAuthRequest({ method: 'post', url: API_URL.FRIEND_REQUEST, body });
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
    await httpAuthRequest({ method: 'post', url: API_URL.FRIEND_CANCEL, body });
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
    await httpAuthRequest({ method: 'post', url: API_URL.FRIEND_ACCEPT, body });
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
    await httpAuthRequest({ method: 'post', url: API_URL.FRIEND_REFUSE, body });
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
    await httpAuthRequest({ method: 'delete', url: API_URL.FRIEND_USER, body });
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
