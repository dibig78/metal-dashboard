import { createServer } from 'vite';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = await createServer({
  configFile: path.join(__dirname, 'packages/frontend/vite.config.ts'),
  root: path.join(__dirname, 'packages/frontend'),
  server: { port: 3000 },
});

await server.listen();
server.printUrls();
