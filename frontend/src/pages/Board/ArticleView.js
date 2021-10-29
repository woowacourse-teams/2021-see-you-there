import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';

import { useMutateBoard, useConfirm } from '../../hooks';
import { Confirm } from '../../components';
import {
  ContentArea,
  ArticleSection,
  ArticleHeader,
  TagGroup,
  StatusTag,
  TypeTag,
  DetailGroup,
  ArticleWriter,
  ArticleDate,
  ArticleBody,
  CommentSection,
  CommentHeader,
  CommentBody,
  EditButtonGroup,
  Divider,
} from './style';
import { BoardContext, UserContext } from '../../contexts';
import { ARTICLE, MESSAGE } from '../../constants';

const FORM_ID_COMMENT_EDIT = 'commentEdit';

export const ArticleView = () => {
  const history = useHistory();
  const { url } = useRouteMatch();
  const { articleId } = useParams();

  const { article, setArticleId, isArticleLoading } = useContext(BoardContext);
  const { deleteArticle, createComment, updateComment, deleteComment } = useMutateBoard();

  const { memberId: userMemberId, isAdmin } = useContext(UserContext);
  const { createTime, memberId, title, content, commentResponse, type } = article ?? {};
  const isAuthor = memberId === userMemberId;

  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [comment, setComment] = useState(commentResponse?.content);
  const hasComment = !!commentResponse;

  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: deleteArticle,
  });

  const handleSubmitComment = (e) => {
    e.preventDefault();

    if (hasComment) {
      updateComment({ id: articleId, content: comment });
      setIsCommentEditing(false);
      return;
    }
    createComment({ id: articleId, content: comment });
    setIsCommentEditing(false);
  };

  const handleDeleteArticle = () => {
    openConfirm({ id: articleId });
  };

  const handleChangeComment = (e) => {
    setComment(e.target.value);
  };

  const handleDeleteComment = () => {
    deleteComment({ id: articleId });
  };

  useEffect(() => {
    if (articleId) {
      setArticleId(articleId);
    }

    return () => setArticleId(null);
  }, []);

  useEffect(() => {
    if (commentResponse) {
      setComment(commentResponse.content);
    }
  }, [commentResponse]);

  if (!article || isArticleLoading) {
    return null;
  }

  return (
    <ContentArea>
      <h2>무엇이든 얘기해주세요!</h2>
      <span>관리자가 직접 답변해드릴게요 :)</span>

      <ArticleSection>
        <ArticleHeader>
          <TagGroup style={{ flexDirection: 'row-reverse', height: 'auto' }}>
            <StatusTag status={hasComment}>{hasComment ? '답변완료' : '답변대기'}</StatusTag>
            <TypeTag type={type}>{type === ARTICLE.TYPE.SUGGESTION ? '제안합니다' : '고쳐주세요'}</TypeTag>
          </TagGroup>

          <h3>{title}</h3>

          <DetailGroup>
            <ArticleWriter>{memberId.slice(0, 4) + '***'}</ArticleWriter>
            <ArticleDate>{createTime.slice(0, 10).replace(/-/g, '. ')}</ArticleDate>
          </DetailGroup>

          {isAuthor && !hasComment && (
            <EditButtonGroup>
              <button onClick={() => history.push(`${url}/edit`)}>수정</button>
              <button onClick={handleDeleteArticle}>삭제</button>
            </EditButtonGroup>
          )}
          <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
            {MESSAGE.BOARD.CONFIRM_ARTICLE_DELETE}
          </Confirm>
        </ArticleHeader>
        <Divider />

        <ArticleBody>
          <p>{content}</p>
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
                  {hasComment && <button onClick={handleDeleteComment}>삭제</button>}
                </>
              )}
            </EditButtonGroup>
          )}
        </CommentHeader>

        <CommentBody isEditing={isCommentEditing}>
          <p>{hasComment ? comment : MESSAGE.BOARD.DEFAULT_COMMENT}</p>
          <form id={FORM_ID_COMMENT_EDIT} onSubmit={handleSubmitComment}>
            <textarea aria-label="답글 작성" value={comment} onChange={handleChangeComment} />
          </form>
        </CommentBody>
      </CommentSection>
    </ContentArea>
  );
};
