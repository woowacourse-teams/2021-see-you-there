import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { useBoard } from '../../hooks';
import { ArticleList } from './ArticleList';
import { ArticleView } from './ArticleView';
import { ArticleNew } from './ArticleNew';

const HEADER_HEIGHT = 280;
const CARD_HEIGHT = 120;

const BoardPage = () => {
  const { path } = useRouteMatch();
  const articleCountPerPage = Math.floor(((window.innerHeight - HEADER_HEIGHT) / CARD_HEIGHT) * 2);
  const board = useBoard({ articleCountPerPage });

  return (
    <main>
      <Switch>
        <Route exact path={path}>
          <ArticleList board={board} />
        </Route>
        <Route exact path={`${path}/new`}>
          <ArticleNew />
        </Route>
        <Route path={`${path}/:articleId`}>
          <ArticleView />
        </Route>
      </Switch>
    </main>
  );
};

export default BoardPage;
