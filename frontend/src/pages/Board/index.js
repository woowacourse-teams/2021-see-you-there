import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { ArticleList } from './ArticleList';
import { ArticleView } from './ArticleView';
import { ArticleNew } from './ArticleNew';
import { ContentArea } from './style';

const BoardPage = () => {
  const { path } = useRouteMatch();

  return (
    <main>
      <ContentArea>
        <h2>무엇이든 얘기해주세요!</h2>
        <span>관리자가 직접 답변해드릴게요 :)</span>

        <Switch>
          <Route exact path={path}>
            <ArticleList />
          </Route>
          <Route exact path={`${path}/new`}>
            <ArticleNew />
          </Route>
          <Route path={`${path}/:id`}>
            <ArticleView />
          </Route>
        </Switch>
      </ContentArea>
    </main>
  );
};

export default BoardPage;
