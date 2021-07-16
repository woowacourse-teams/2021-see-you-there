const getOptions = ({ accessToken, data, method }) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data ? JSON.stringify(data) : null,
    method,
  };
};

export const httpRequest = {
  get: (url, options) => fetch(url, getOptions({ ...options })),
  post: (url, options) => fetch(url, getOptions({ ...options, method: 'POST' })),
  put: (url, options) => fetch(url, getOptions({ ...options, method: 'PUT' })),
  delete: (url, options) => fetch(url, getOptions({ ...options, method: 'DELETE' })),
};
