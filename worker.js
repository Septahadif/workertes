export default {
  async fetch(request, env, ctx) {
    const targetUrl = "https://septa.alwaysdata.net/vless";
    const url = new URL(request.url);

    // Ambil header dari request asli
    const newHeaders = new Headers(request.headers);

    // Jika ini adalah koneksi WebSocket
    if (request.headers.get("Upgrade") === "websocket") {
      return fetch(targetUrl, {
        headers: newHeaders,
        method: request.method,
        body: request.body,
        redirect: "follow"
      });
    }

    // Untuk request HTTP biasa (non-websocket)
    return fetch(targetUrl, {
      headers: newHeaders,
      method: request.method,
      body: request.body,
      redirect: "follow"
    });
  },
};
