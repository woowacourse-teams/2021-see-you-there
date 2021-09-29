import React from 'react';
import { useParams } from 'react-router-dom';

export const ArticleView = () => {
  const { id } = useParams();

  return (
    <>
      <div>id: {id}</div>
    </>
  );
};
