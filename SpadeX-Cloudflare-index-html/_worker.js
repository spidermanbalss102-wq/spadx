export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isPageRequest = request.method === 'GET' || request.method === 'HEAD';

    if (isPageRequest && url.pathname === '/') {
      url.pathname = '/index.html';
      return new Response(null, {
        status: 302,
        headers: {Location: url.href, 'Cache-Control': 'no-store'},
      });
    }

    if (isPageRequest && url.pathname === '/index.html') {
      // Retrieve the homepage internally, keeping /index.html in the address.
      const assetUrl = new URL(url);
      assetUrl.pathname = '/';
      return env.ASSETS.fetch(new Request(assetUrl, request));
    }

    return env.ASSETS.fetch(request);
  },
};
