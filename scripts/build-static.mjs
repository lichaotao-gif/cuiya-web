import { cp, mkdir, readdir, rm } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDirectory = fileURLToPath(new URL('../', import.meta.url));
const outputDirectory = join(projectDirectory, 'dist');
const staticDirectories = new Set(['assets', 'products']);
const staticFiles = new Set(['robots.txt', 'sitemap.xml']);

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

const entries = await readdir(projectDirectory, { withFileTypes: true });

for (const entry of entries) {
  const isStaticDirectory = entry.isDirectory() && staticDirectories.has(entry.name);
  const isStaticFile = entry.isFile()
    && (extname(entry.name) === '.html' || staticFiles.has(entry.name));

  if (!isStaticDirectory && !isStaticFile) continue;

  await cp(
    join(projectDirectory, entry.name),
    join(outputDirectory, entry.name),
    { recursive: true },
  );
}

console.log('静态网站已构建到 dist/');
