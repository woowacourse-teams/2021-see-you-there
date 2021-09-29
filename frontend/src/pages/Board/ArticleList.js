import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { Icon, LinkRound } from '../../components';
import {
  ButtonSection,
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
import { MOCK_BOARD_ITEM_LIST } from '../../constants';

export const ArticleList = () => {
  const { url } = useRouteMatch();
  const data = MOCK_BOARD_ITEM_LIST;

  return (
    <>
      <ButtonSection>
        <LinkRound size="sm" Icon={<Icon.Edit width="18" color="#fff" />} to={`${url}/new`}>
          새 게시글
        </LinkRound>
      </ButtonSection>

      <ListSection>
        <Filter>
          <Icon.Filter width="18" />
          필터
          <ul>
            <FilterItem type="suggestion">제안합니다</FilterItem>
            <FilterItem type="fix">고쳐주세요</FilterItem>
          </ul>
        </Filter>

        <List>
          {data
            .sort((a, b) => b.id - a.id)
            .map(({ id, createTime, memberId, title, commentResponse, type }) => (
              <ListItem key={id}>
                <Link to={`${url}/${id}`}>
                  <TitleGroup>
                    <ArticleId>#{id}</ArticleId>
                    <ArticleTitle>{title}</ArticleTitle>
                  </TitleGroup>

                  <TagGroup>
                    <StatusTag status={commentResponse}>{commentResponse ? '답변완료' : '답변대기'}</StatusTag>
                    <TypeTag type={type}>{type === 'suggestion' ? '제안합니다' : '고쳐주세요'}</TypeTag>
                  </TagGroup>

                  <DetailGroup>
                    <ArticleWriter>{memberId.slice(0, 4) + '***'}</ArticleWriter>
                    <ArticleDate>{createTime.slice(0, 10).replace(/-/g, '. ')}</ArticleDate>
                  </DetailGroup>
                </Link>
              </ListItem>
            ))}
        </List>
      </ListSection>
    </>
  );
};
