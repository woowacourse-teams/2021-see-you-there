import { useContext } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import { SnackbarContext, UserContext, BoardContext } from '../contexts';
import { QUERY_KEY, API_URL, MESSAGE, ROUTE } from '../constants';

export const useMutateBoard = () => {
  const history = useHistory();
  const { httpAuthRequest } = useContext(UserContext);
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useContext(SnackbarContext);
  const { resetBoard } = useContext(BoardContext);

  /* 추가 */
  const fetchArticleCreation = async (body) => {
    await httpAuthRequest({ method: 'post', url: API_URL.ARTICLE, body });
  };

  const articleCreation = useMutation((body) => fetchArticleCreation(body), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_ARTICLE_CREATE);
      resetBoard();
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE_LIST);
      history.push(ROUTE.BOARD.PATH);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const createArticle = ({ title, content, type }) => {
    articleCreation.mutate({ title, content, type });
  };

  /* 수정 */
  const fetchArticleUpdate = async (body, id) => {
    await httpAuthRequest({ method: 'put', url: API_URL.ARTICLE_BY_ID(id), body });

    return id;
  };

  const articleUpdate = useMutation(({ id, ...body }) => fetchArticleUpdate(body, id), {
    onSuccess: (id) => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_ARTICLE_UPDATE);
      resetBoard();
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE_LIST);
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE);
      history.push(ROUTE.BOARD.PATH + `/${id}`);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const updateArticle = ({ id, title, content, type }) => {
    articleUpdate.mutate({ id, title, content, type });
  };

  /* 삭제 */
  const fetchArticleDeletion = async (id) => {
    await httpAuthRequest({ method: 'delete', url: API_URL.ARTICLE_BY_ID(id) });
  };

  const articleDeletion = useMutation((id) => fetchArticleDeletion(id), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_ARTICLE_DELETE);
      resetBoard();
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE_LIST);
      history.push(ROUTE.BOARD.PATH);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const deleteArticle = ({ id }) => {
    articleDeletion.mutate(id);
  };

  /* 답변 추가 */
  const fetchCommentCreation = async (body, id) => {
    await httpAuthRequest({ method: 'post', url: API_URL.COMMENT(id), body });
  };

  const commentCreation = useMutation(({ id, ...body }) => fetchCommentCreation(body, id), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_COMMENT_CREATE);
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const createComment = ({ id, content }) => {
    commentCreation.mutate({ id, content });
  };

  /* 답변 수정 */
  const fetchCommentUpdate = async (body, id) => {
    await httpAuthRequest({ method: 'put', url: API_URL.COMMENT(id), body });
  };

  const commentUpdate = useMutation(({ id, ...body }) => fetchCommentUpdate(body, id), {
    onSuccess: (id) => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_COMMENT_UPDATE);
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const updateComment = ({ id, content }) => {
    commentUpdate.mutate({ id, content });
  };

  /* 답변 삭제 */
  const fetchCommentDeletion = async (id) => {
    await httpAuthRequest({ method: 'delete', url: API_URL.COMMENT(id) });
  };

  const commentDeletion = useMutation((id) => fetchCommentDeletion(id), {
    onSuccess: () => {
      enqueueSnackbar(MESSAGE.BOARD.SNACKBAR_COMMENT_DELETE);
      queryClient.invalidateQueries(QUERY_KEY.ARTICLE);
    },
    onError: () => enqueueSnackbar(MESSAGE.ERROR.NETWORK, { variant: 'error' }),
  });

  const deleteComment = ({ id }) => {
    commentDeletion.mutate(id);
  };

  return { createArticle, updateArticle, deleteArticle, createComment, updateComment, deleteComment };
};
