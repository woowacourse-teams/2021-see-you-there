import { useState, useContext, useEffect } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';

import { UserContext } from '../contexts';
import { API_URL, QUERY_KEY } from '../constants';

const PAGE1 = 1;

export const useBoard = ({ articleId, articleCountPerPage } = {}) => {
  const { httpAuthRequest } = useContext(UserContext);
  const [pageNumber, setPageNumber] = useState(PAGE1);
  const [totalArticleList, setTotalArticleList] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);

  const fetchArticleList = async () => {
    const response = await httpAuthRequest({
      url: API_URL.ARTICLE_LIST(articleCountPerPage, pageNumber),
    });

    return await response.json();
  };

  const { data: articleList, isLoading: isFetchingNextPage } = useQuery(
    [QUERY_KEY.ARTICLE_LIST, pageNumber],
    fetchArticleList,
    {
      enabled: !articleId,
    }
  );

  const fetchArticle = async () => {
    const response = await httpAuthRequest({
      url: API_URL.ARTICLE(articleId),
    });

    return await response.json();
  };

  const { data: article, isLoading: isArticleLoading } = useQuery([QUERY_KEY.ARTICLE, articleId], fetchArticle, {
    enabled: !!articleId,
  });

  const fetchNextPage = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    if (articleList?.length < articleCountPerPage) {
      setHasNextPage(false);
    }

    if (articleList) {
      setTotalArticleList((prev) => [...prev, ...articleList]);
    }
  }, [articleList]);

  return {
    totalArticleList,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,

    article,
    isArticleLoading,
  };
};
