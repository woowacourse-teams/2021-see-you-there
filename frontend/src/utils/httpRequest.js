const getOptions = ({ accessToken, body, method }) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
    method,
  };
};

export const httpRequest = {
  get: (url, options) => fetch(url, getOptions({ ...options })),
  post: (url, options) => fetch(url, getOptions({ ...options, method: 'POST' })),
  put: (url, options) => fetch(url, getOptions({ ...options, method: 'PUT' })),
  delete: (url, options) => fetch(url, getOptions({ ...options, method: 'DELETE' })),
};
