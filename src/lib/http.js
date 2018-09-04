import * as QS from 'query-string';

function buildRequest(method, body) {
  const request = {
    headers: {
      Accept: 'application/json',
    },
    cache: 'default',
    method,
  };

  if (body) {
    if (body instanceof FormData) {
      request.body = body;
    } else {
      request.body = JSON.stringify(body);
      request.headers['Content-Type'] = 'application/json';
    }
  }

  return request;
}

function callFetch(path, request) {
  return fetch(path, request).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  });
}

function httpDelete(path, data) {
  return callFetch(path, buildRequest('DELETE', data));
}

function get(path, params = {}) {
  const { url, query } = QS.parseUrl(path);

  return callFetch(
    `${url}?${QS.stringify({ ...query, ...params })}`,
    buildRequest('GET'),
  );
}

function patch(path, data) {
  return callFetch(path, buildRequest('PATCH', data));
}

function post(path, data) {
  return callFetch(path, buildRequest('POST', data));
}

function put(path, data) {
  return callFetch(path, buildRequest('PUT', data));
}

const Http = {
  delete: httpDelete,
  get,
  patch,
  post,
  put,
};

export default Http;

