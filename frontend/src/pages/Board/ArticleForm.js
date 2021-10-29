import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { useMutateBoard } from '../../hooks';
import { BoardContext, UserContext } from '../../contexts';
import { ContentArea, Form, ArticleTypeSelector, FormLabel } from './style';
import { ButtonRound, InputRadio, Icon } from '../../components';
import { addThousandSeparator } from '../../utils';
import { ARTICLE, COLOR, ROUTE } from '../../constants';

const MAX_LENGTH_TITLE = 50;
const MAX_LENGTH_CONTENT = 2000;

export const ArticleForm = () => {
  const history = useHistory();
  const { articleId } = useParams();
  const isEditing = !!articleId;
  const { memberId: userMemberId } = useContext(UserContext);
  const { article, setArticleId, isArticleLoading } = useContext(BoardContext);

  const { createArticle, updateArticle } = useMutateBoard();

  const [type, setType] = useState(ARTICLE.TYPE.SUGGESTION);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChangeTitle = (e) => {
    const value = e.target.value;
    const slicedValue = value.slice(0, MAX_LENGTH_TITLE);

    if (title.length >= MAX_LENGTH_TITLE && value.length >= MAX_LENGTH_TITLE) {
      return;
    }
    setTitle(slicedValue);
  };

  const handleChangeContent = (e) => {
    const value = e.target.value;
    const slicedValue = value.slice(0, MAX_LENGTH_CONTENT);

    if (content.length >= MAX_LENGTH_CONTENT && value.length >= MAX_LENGTH_CONTENT) {
      return;
    }
    setContent(slicedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      updateArticle({
        id: articleId,
        title,
        content,
        type,
      });
      return;
    }
    createArticle({
      title,
      content,
      type,
    });
  };

  useEffect(() => {
    if (articleId) {
      setArticleId(articleId);
    }
  }, [articleId]);

  useEffect(() => {
    if (!articleId || !article) {
      return;
    }

    const isAuthor = article.memberId === userMemberId;

    if (!isAuthor) {
      history.replace(ROUTE.BOARD.PATH);
      return;
    }
    if (articleId && article) {
      setType(article.type);
      setTitle(article.title);
      setContent(article.content);
    }
  }, [article]);

  return (
    <ContentArea>
      <h2>무엇이든 얘기해주세요!</h2>
      <span>관리자가 직접 답변해드릴게요 :)</span>

      <Form onSubmit={handleSubmit}>
        <ArticleTypeSelector>
          <label>
            <InputRadio
              type="radio"
              name="type"
              value={ARTICLE.TYPE.SUGGESTION}
              checked={type === ARTICLE.TYPE.SUGGESTION}
              onChange={() => setType(ARTICLE.TYPE.SUGGESTION)}
            />
            제안합니다
          </label>
          <label>
            <InputRadio
              type="radio"
              name="type"
              color={COLOR.ACCENT}
              value={ARTICLE.TYPE.FIX}
              checked={type === ARTICLE.TYPE.FIX}
              onChange={() => setType(ARTICLE.TYPE.FIX)}
            />
            고쳐주세요
          </label>
        </ArticleTypeSelector>

        <FormLabel>
          제목
          <span>
            {title.length} / {MAX_LENGTH_TITLE}
          </span>
          <input value={title} onChange={handleChangeTitle} />
        </FormLabel>

        <FormLabel>
          내용
          <span>
            {addThousandSeparator(content.length)} / {addThousandSeparator(MAX_LENGTH_CONTENT)}
          </span>
          <textarea
            placeholder="어느 페이지의 어떤 기능인지 구체적으로 작성해 주시면 구현 가능성을 검토하는데 도움이 됩니다."
            value={content}
            onChange={handleChangeContent}
          />
        </FormLabel>

        <p>[주의] 게시판 성격과 관계없는 글은 임의로 삭제될 수 있습니다.</p>

        <ButtonRound size="sm" Icon={<Icon.Edit width="18" color="#fff" />}>
          {isEditing ? '수정하기' : '등록하기'}
        </ButtonRound>
      </Form>
    </ContentArea>
  );
};
