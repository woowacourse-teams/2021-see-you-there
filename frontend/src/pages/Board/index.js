import React from 'react';
import { Switch, useRouteMatch } from 'react-router-dom';

import { ArticleList } from './ArticleList';
import { ArticleView } from './ArticleView';
import { ArticleForm } from './ArticleForm';
import { RouteWithVisitLogging } from '../../components';
import { BoardContextProvider } from '../../contexts';

const MIN_ARTICLE_COUNT_PER_PAGE = 3;
const HEADER_HEIGHT = 280;
const CARD_HEIGHT = 120;

const BoardPage = () => {
  const { path } = useRouteMatch();
  const articleCountPerPage = Math.max(
    MIN_ARTICLE_COUNT_PER_PAGE,
    Math.floor(((window.innerHeight - HEADER_HEIGHT) / CARD_HEIGHT) * 2)
  );

  return (
    <main>
      <BoardContextProvider articleCountPerPage={articleCountPerPage}>
        <Switch>
          <RouteWithVisitLogging exact path={path}>
            <ArticleList />
          </RouteWithVisitLogging>
          <RouteWithVisitLogging exact path={`${path}/new`}>
            <ArticleForm />
          </RouteWithVisitLogging>
          <RouteWithVisitLogging exact path={`${path}/:articleId/edit`}>
            <ArticleForm />
          </RouteWithVisitLogging>
          <RouteWithVisitLogging path={`${path}/:articleId`}>
            <ArticleView />
          </RouteWithVisitLogging>
        </Switch>
      </BoardContextProvider>
    </main>
  );
};

export default BoardPage;
