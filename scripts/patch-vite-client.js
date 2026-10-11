import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientPath = path.resolve(__dirname, '../node_modules/vite/dist/client/client.mjs');

if (fs.existsSync(clientPath)) {
  let content = fs.readFileSync(clientPath, 'utf-8');
  let modified = false;

  const errorString = 'reject(new Error("WebSocket closed without opened."));';
  if (content.includes(errorString)) {
    content = content.replace(errorString, 'resolve();');
    modified = true;
  }

  const connectTarget = 'async connect({ onMessage, onDisconnection }) {\n      const socket = options.createConnection();';
  if (content.includes(connectTarget)) {
    content = content.replace(
      connectTarget,
      'async connect({ onMessage, onDisconnection }) {\n      return;\n      const socket = options.createConnection();'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(clientPath, content, 'utf-8');
    console.log('[patch-vite-client] Patched Vite client to disable HMR WebSocket in container environment.');
  } else {
    console.log('[patch-vite-client] Vite client already patched.');
  }
}
