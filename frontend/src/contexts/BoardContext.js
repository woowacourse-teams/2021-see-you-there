import React, { useEffect, useState, createContext, useContext } from 'react';
import { useQuery } from 'react-query';
import PropTypes from 'prop-types';

import { UserContext } from '.';
import { API_URL, QUERY_KEY } from '../constants';

const INITIAL_PAGE = 1;
const INITIAL_LIST = [];

export const BoardContext = createContext();

export const BoardContextProvider = ({ articleCountPerPage, children }) => {
  const { httpAuthRequest } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(INITIAL_PAGE);
  const [totalArticleList, setTotalArticleList] = useState(INITIAL_LIST);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [articleId, setArticleId] = useState(null);

  const fetchArticleList = async () => {
    const response = await httpAuthRequest({
      url: API_URL.ARTICLE_LIST(articleCountPerPage, pageNumber),
    });

    return await response.json();
  };

  const { data: articleList, isLoading: isFetchingNextPage } = useQuery(
    [QUERY_KEY.ARTICLE_LIST, pageNumber],
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
    setPageNumber((prev) => prev + 1);
  };

  const resetBoard = () => {
    setTotalArticleList(INITIAL_LIST);
    setPageNumber(INITIAL_PAGE);
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
        pageNumber,
        setPageNumber,
        totalArticleList,
        setTotalArticleList,
        hasNextPage,
        setHasNextPage,
        articleId,
        setArticleId,

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
