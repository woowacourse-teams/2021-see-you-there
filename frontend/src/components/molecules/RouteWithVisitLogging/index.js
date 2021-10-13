import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

window.dataLayer = window.dataLayer || [];

const gtag = (...params) => window.dataLayer.push(...params);

gtag('js', new Date());
gtag('config', GTAG);

export const RouteWithVisitLogging = (props) => {
  const { path, children, ...rest } = props;

  useEffect(() => {
    gtag('set', 'page_path', path);
    gtag('event', 'page_view');
  });

  return (
    <Route path={path} {...rest}>
      {children}
    </Route>
  );
};

RouteWithVisitLogging.propTypes = {
  children: PropTypes.node,
  path: PropTypes.any,
};
