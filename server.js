// Combined dev server launcher
const { execSync, spawn } = require('child_process');
const path = require('path');

const root = __dirname;

// Start backend
const backend = spawn(
  process.execPath,
  [
    path.join(root, 'node_modules/ts-node-dev/lib/bin.js'),
    '--transpile-only',
    '--project', path.join(root, 'packages/backend/tsconfig.json'),
    path.join(root, 'packages/backend/src/index.ts'),
  ],
  { cwd: root, stdio: 'inherit' }
);

// Start frontend with correct cwd
const frontend = spawn(
  process.execPath,
  [
    path.join(root, 'node_modules/vite/bin/vite.js'),
    '--port', '3000',
  ],
  { cwd: path.join(root, 'packages/frontend'), stdio: 'inherit' }
);

process.on('SIGTERM', () => {
  backend.kill();
  frontend.kill();
});
