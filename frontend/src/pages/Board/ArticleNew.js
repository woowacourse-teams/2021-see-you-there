import React from 'react';

import { ArticleNewForm, ArticleTypeSelector, ArticleFormLabel } from './style';
import { ButtonRound, InputRadio, Icon } from '../../components';
import { ARTICLE, COLOR } from '../../constants';
import { addThousandSeparator } from '../../utils';

export const ArticleNew = () => {
  return (
    <ArticleNewForm>
      <ArticleTypeSelector>
        <label>
          <InputRadio type="radio" name="type" value={ARTICLE.TYPE.SUGGESTION} />
          제안합니다
        </label>
        <label>
          <InputRadio type="radio" name="type" color={COLOR.ACCENT} value={ARTICLE.TYPE.FIX} />
          고쳐주세요
        </label>
      </ArticleTypeSelector>

      <ArticleFormLabel>
        제목
        <span>1 / 50</span>
        <input />
      </ArticleFormLabel>

      <ArticleFormLabel>
        내용
        <span>1 / 2,000</span>
        <textarea placeholder="어느 페이지의 어떤 기능인지 구체적으로 작성해 주시면 구현 가능성을 검토하는데 도움이 됩니다." />
      </ArticleFormLabel>

      <p>[주의] 게시판 성격과 관계없는 글은 임의로 삭제될 수 있습니다.</p>

      <ButtonRound size="sm" Icon={<Icon.Edit width="18" color="#fff" />}>
        등록하기
      </ButtonRound>
    </ArticleNewForm>
  );
};
