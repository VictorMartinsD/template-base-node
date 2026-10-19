import type { IncomingMessage, ServerResponse } from "node:http";
import { URL } from "node:url";

function sendJson(response: ServerResponse, statusCode: number, body: object) {
  response.writeHead(statusCode, { "Content-Type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(body));
}

export function app(request: IncomingMessage, response: ServerResponse) {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? "localhost"}`);

  if (request.method === "GET" && requestUrl.pathname === "/health") {
    sendJson(response, 200, { status: "ok" });
    return;
  }

  sendJson(response, 404, { error: "Route not found" });
}
