import React from 'react';

import { Icon, ButtonRound } from '../../components';
import {
  ContentArea,
  ButtonSection,
  Filter,
  FilterItem,
  ListSection,
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

const BoardPage = () => {
  const data = MOCK_BOARD_ITEM_LIST;

  return (
    <main>
      <ContentArea>
        <h2>무엇이든 얘기해주세요!</h2>
        <span>관리자가 직접 답변해드릴게요 :)</span>

        <ButtonSection>
          <ButtonRound type="submit" size="sm" Icon={<Icon.Edit width="18" color="#fff" />} onClick={() => {}}>
            새 게시글
          </ButtonRound>
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
                </ListItem>
              ))}
          </List>
        </ListSection>
      </ContentArea>
    </main>
  );
};

export default BoardPage;
