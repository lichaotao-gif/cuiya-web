import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const port = Number.parseInt(process.env.PORT ?? '5173', 10);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.gif': 'image/gif',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
    const relativePath = normalize(pathname).replace(/^[/\\]+/, '');
    let filePath = join(projectDirectory, relativePath || 'index.html');

    if (!filePath.startsWith(projectDirectory)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (fileStat.isDirectory()) filePath = join(filePath, 'index.html');

    response.writeHead(200, {
      'Content-Type': contentTypes[extname(filePath).toLowerCase()] ?? 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`本地网站已启动：http://localhost:${port}`);
  console.log('按 Ctrl+C 停止。');
});
