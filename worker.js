// Cloudflare Worker (Modules)
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Ubah origin target di sini
    const ORIGIN_HOST = "septa.alwaysdata.net";
    const ORIGIN_PATH = "/vless";

    const upgrade = request.headers.get("Upgrade");
    const isWS = upgrade && upgrade.toLowerCase() === "websocket";

    // Proxy WebSocket
    if (isWS) {
      // Bangun URL origin WS
      const target = new URL(`https://${ORIGIN_HOST}${ORIGIN_PATH}`);

      // Teruskan handshake ke origin
      // (fetch() akan menjaga Upgrade: websocket bila request memang WS)
      const newReq = new Request(target.toString(), request);

      return fetch(newReq);
    }

    // Untuk request non-WS (opsional): bisa return 404 atau proxy HTTP biasa
    return new Response("Not Found", { status: 404 });
  },
};
