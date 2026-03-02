const { createServer } = require('vite');
async function start() {
  const server = await createServer({
    configFile: './packages/frontend/vite.config.ts',
    server: { port: 3000 }
  });
  await server.listen();
  server.printUrls();
}
start();
