import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  ArticleSection,
  ArticleHeader,
  TagGroup,
  StatusTag,
  TypeTag,
  DetailGroup,
  ArticleWriter,
  ArticleDate,
  EditButtonGroup,
  ArticleBody,
  CommentSection,
  CommentHeader,
  CommentBody,
  Divider,
} from './style';
import { MOCK_BOARD_ITEM_LIST, ARTICLE_TYPE } from '../../constants';

const FORM_ID_ARTICLE_EDIT = 'articleEdit';
const FORM_ID_COMMENT_EDIT = 'commentEdit';

export const ArticleView = () => {
  const { id } = useParams();
  const { createTime, memberId, title, content, commentResponse, label: type } = MOCK_BOARD_ITEM_LIST[1];
  const hasComment = !!commentResponse;
  const [isArticleEditing, setIsArticleEditing] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const isAdmin = true;
  const isAuthor = true;

  const handleSubmitComment = () => {
    if (hasComment) {
      // 수정 api 요청
      return;
    }
    // 생성 api 요청
  };

  return (
    <>
      <ArticleSection>
        <ArticleHeader>
          <TagGroup style={{ flexDirection: 'row-reverse', height: 'auto' }}>
            <StatusTag status={commentResponse}>{commentResponse ? '답변완료' : '답변대기'}</StatusTag>
            <TypeTag type={type}>{type === ARTICLE_TYPE.SUGGESTION ? '제안합니다' : '고쳐주세요'}</TypeTag>
          </TagGroup>

          <h3>{title}</h3>

          <DetailGroup>
            <ArticleWriter>{memberId.slice(0, 4) + '***'}</ArticleWriter>
            <ArticleDate>{createTime.slice(0, 10).replace(/-/g, '. ')}</ArticleDate>
          </DetailGroup>

          {isAuthor && (
            <EditButtonGroup isEditing={isArticleEditing}>
              {isArticleEditing ? (
                <>
                  <button onClick={() => setIsArticleEditing(false)}>취소</button>
                  <button form={FORM_ID_ARTICLE_EDIT}>확정</button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsArticleEditing(true)}>수정</button>
                  <button>삭제</button>
                </>
              )}
            </EditButtonGroup>
          )}
        </ArticleHeader>
        <Divider />

        <ArticleBody isEditing={isArticleEditing}>
          <p>{content}</p>
          <form id={FORM_ID_ARTICLE_EDIT}>
            <textarea aria-label="게시글 수정" defaultValue={content} />
          </form>
        </ArticleBody>

        <Divider />
      </ArticleSection>

      <CommentSection>
        <CommentHeader>
          <h4>답변</h4>

          {isAdmin && (
            <EditButtonGroup isEditing={isCommentEditing}>
              {isCommentEditing ? (
                <>
                  <button onClick={() => setIsCommentEditing(false)}>취소</button>
                  <button form={FORM_ID_COMMENT_EDIT} onSubmit={handleSubmitComment}>
                    등록
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setIsCommentEditing(true)}>{hasComment ? '수정' : '작성'}</button>
                  {hasComment && <button>삭제</button>}
                </>
              )}
            </EditButtonGroup>
          )}
        </CommentHeader>

        <CommentBody isEditing={isCommentEditing}>
          <p>{commentResponse ? commentResponse : '잠시만 기다려주세요.🙏 관리자가 확인하러 달려오고 있어요.💨💨💨'}</p>
          <form id={FORM_ID_COMMENT_EDIT}>
            <textarea aria-label="답글 작성" defaultValue={commentResponse} />
          </form>
        </CommentBody>
      </CommentSection>
    </>
  );
};
