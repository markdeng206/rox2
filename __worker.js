const TELEGRAPH_URL = `${targetUrl}`;

async function handleRequest(request) {
  const url = new URL(request.url);
  const headers_Origin =
    request.headers.get('Access-Control-Allow-Origin') || '*';
  url.host = TELEGRAPH_URL.replace(/^https?:\/\//, '');
  request.headers.set('Authorization', `${APIKEY}`);
  const modifiedRequest = new Request(url.toString(), {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: 'follow',
  });
  const response = await fetch(modifiedRequest);
  const modifiedResponse = new Response(response.body, response);
  modifiedResponse.headers.set('Access-Control-Allow-Origin', headers_Origin);
  return modifiedResponse;
}

export default {
  async fetch(request, env) {
    const NewResponse = await handleRequest(request);
    return NewResponse;
  },
};
