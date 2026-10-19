import { createServer } from "node:http";

import { app } from "./app.js";

const port = Number(process.env.PORT) || 3333;
const server = createServer(app);

server.listen(port, () => {
  console.info(`API running at http://localhost:${port}`);
});
