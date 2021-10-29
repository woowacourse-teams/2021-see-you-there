import React, { useEffect, useState, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import { UserContext } from '.';
import { API_URL, ARTICLE, QUERY_KEY } from '../constants';

const INITIAL_LIST = [];

export const BoardContext = createContext();

export const BoardContextProvider = ({ articleCountPerPage, children }) => {
  const { httpAuthRequest } = useContext(UserContext);
  const [lastBoardId, setLastBoardId] = useState(null);
  const [totalArticleList, setTotalArticleList] = useState(INITIAL_LIST);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [articleId, setArticleId] = useState(null);
  const [type, setType] = useState(ARTICLE.TYPE.ALL);

  const fetchArticleList = async () => {
    let url = API_URL.ARTICLE_LIST(articleCountPerPage);

    if (type !== ARTICLE.TYPE.ALL) {
      url += `&type=${type}`;
    }
    if (lastBoardId) {
      url += `&lastBoardId=${lastBoardId}`;
    }

    const response = await httpAuthRequest({ url });

    return await response.json();
  };

  const { data: articleList, isLoading: isFetchingNextPage } = useQuery(
    [QUERY_KEY.ARTICLE_LIST, type, lastBoardId],
    fetchArticleList
  );

  const fetchArticle = async () => {
    const response = await httpAuthRequest({
      url: API_URL.ARTICLE_BY_ID(articleId),
    });

    return await response.json();
  };

  const { data: article, isLoading: isArticleLoading } = useQuery([QUERY_KEY.ARTICLE, articleId], fetchArticle, {
    enabled: !!articleId,
  });

  const fetchNextPage = () => {
    const lastId = totalArticleList[totalArticleList.length - 1].id;

    setLastBoardId(lastId);
  };

  const resetBoard = () => {
    setTotalArticleList(INITIAL_LIST);
    setLastBoardId(null);
  };

  const setTypeWithNewBoard = (type) => {
    resetBoard();
    setType(type);
  };

  useEffect(() => {
    if (articleList?.length < articleCountPerPage) {
      setHasNextPage(false);
    }

    if (articleList) {
      setTotalArticleList((prev) => [...prev, ...articleList]);
    }
  }, [articleList]);

  return (
    <BoardContext.Provider
      value={{
        lastBoardId,
        setLastBoardId,
        totalArticleList,
        setTotalArticleList,
        hasNextPage,
        setHasNextPage,
        articleId,
        setArticleId,
        type,
        setType: setTypeWithNewBoard,

        fetchNextPage,
        isFetchingNextPage,
        resetBoard,

        article,
        isArticleLoading,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

BoardContextProvider.propTypes = {
  articleCountPerPage: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};
