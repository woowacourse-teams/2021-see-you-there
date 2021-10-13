import React, { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';

import { Icon, LinkRound } from '../../components';
import {
  ContentArea,
  HeaderSection,
  ListSection,
  Filter,
  FilterItem,
  List,
  ListItem,
  TitleGroup,
  ArticleId,
  ArticleTitle,
  TagGroup,
  TypeTag,
  StatusTag,
  DetailGroup,
  ArticleDate,
  ArticleWriter,
} from './style';
import { storage, throttle } from '../../utils';
import { ARTICLE, STORAGE_KEY } from '../../constants';
import { BoardContext } from '../../contexts';

export const ArticleList = () => {
  const { totalArticleList, fetchNextPage, hasNextPage, isFetchingNextPage } = useContext(BoardContext);
  const { url } = useRouteMatch();

  const contentAreaRef = useRef(null);
  const storeScrollTop = (value) => storage.session.set(STORAGE_KEY.SCROLL, value);
  const storedScrollTop = storage.session.get(STORAGE_KEY.SCROLL);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, offsetHeight } = e.target;

    storeScrollTop(scrollTop);

    if (isFetchingNextPage || !hasNextPage) {
      return;
    }

    const isScrollEnded = scrollHeight <= scrollTop + offsetHeight + 50;

    if (isScrollEnded) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (!storedScrollTop) {
      return;
    }
    contentAreaRef.current?.scrollTo(0, storedScrollTop);

    const currentScrollTop = contentAreaRef.current?.scrollTop || 0;

    storeScrollTop(currentScrollTop);
  }, []);

  return (
    <ContentArea ref={contentAreaRef} onScroll={throttle(handleScroll, 300)}>
      <h2>무엇이든 얘기해주세요!</h2>
      <span>관리자가 직접 답변해드릴게요 :)</span>

      <HeaderSection>
        <Filter>
          <Icon.Filter width="18" />
          필터
          <ul>
            <FilterItem type={ARTICLE.TYPE.SUGGESTION}>제안합니다</FilterItem>
            <FilterItem type={ARTICLE.TYPE.FIX}>고쳐주세요</FilterItem>
          </ul>
        </Filter>

        <LinkRound size="sm" Icon={<Icon.Edit width="18" color="#fff" />} to={`${url}/new`}>
          새 게시글
        </LinkRound>
      </HeaderSection>

      <ListSection>
        <List>
          {totalArticleList.map(({ id, createTime, memberId, title, commentResponse, type }) => (
            <ListItem key={id}>
              <Link to={`${url}/${id}`}>
                <TitleGroup>
                  <ArticleId>#{id}</ArticleId>
                  <ArticleTitle>{title}</ArticleTitle>
                </TitleGroup>

                <TagGroup>
                  <StatusTag status={commentResponse}>{commentResponse ? '답변완료' : '답변대기'}</StatusTag>
                  <TypeTag type={type}>{type === ARTICLE.TYPE.SUGGESTION ? '제안합니다' : '고쳐주세요'}</TypeTag>
                </TagGroup>

                <DetailGroup>
                  <ArticleWriter>{memberId?.slice(0, 4) + '***'}</ArticleWriter>
                  <ArticleDate>{createTime?.slice(0, 10).replace(/-/g, '. ')}</ArticleDate>
                </DetailGroup>
              </Link>
            </ListItem>
          ))}
        </List>
      </ListSection>
    </ContentArea>
  );
};

ArticleList.propTypes = {
  totalArticleList: PropTypes.array,
};
