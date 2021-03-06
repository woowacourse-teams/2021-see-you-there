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
      <h2>???????????? ??????????????????!</h2>
      <span>???????????? ?????? ????????????????????? :)</span>

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
            ???????????????
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
            ???????????????
          </label>
        </ArticleTypeSelector>

        <FormLabel>
          ??????
          <span>
            {title.length} / {MAX_LENGTH_TITLE}
          </span>
          <input value={title} onChange={handleChangeTitle} />
        </FormLabel>

        <FormLabel>
          ??????
          <span>
            {addThousandSeparator(content.length)} / {addThousandSeparator(MAX_LENGTH_CONTENT)}
          </span>
          <textarea
            placeholder="?????? ???????????? ?????? ???????????? ??????????????? ????????? ????????? ?????? ???????????? ??????????????? ????????? ?????????."
            value={content}
            onChange={handleChangeContent}
          />
        </FormLabel>

        <p>[??????] ????????? ????????? ???????????? ?????? ????????? ????????? ??? ????????????.</p>

        <ButtonRound size="sm" Icon={<Icon.Edit width="18" color="#fff" />}>
          {isEditing ? '????????????' : '????????????'}
        </ButtonRound>
      </Form>
    </ContentArea>
  );
};
