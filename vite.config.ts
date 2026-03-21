import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs/promises';
import path from 'node:path';

const PROJECT_CONTENT_FILE = path.resolve(__dirname, 'public/content/site-content.json');

function localContentSavePlugin() {
  return {
    name: 'local-content-save-plugin',
    configureServer(server: {
      middlewares: { use: (handler: (req: unknown, res: unknown, next: () => void) => void) => void };
    }) {
      server.middlewares.use((req: unknown, res: unknown, next: () => void) => {
        const request = req as {
          method?: string;
          url?: string;
          on: (event: string, handler: (chunk?: string | Buffer) => void) => void;
        };
        const response = res as {
          statusCode: number;
          setHeader: (name: string, value: string) => void;
          end: (body?: string) => void;
        };

        if (request.method !== 'POST' || request.url !== '/__admin/content') {
          next();
          return;
        }

        let rawBody = '';
        request.on('data', (chunk) => {
          rawBody += String(chunk);
        });

        request.on('end', async () => {
          try {
            const parsed = JSON.parse(rawBody) as unknown;
            await fs.mkdir(path.dirname(PROJECT_CONTENT_FILE), { recursive: true });
            await fs.writeFile(PROJECT_CONTENT_FILE, `${JSON.stringify(parsed, null, 2)}\n`, 'utf8');

            response.statusCode = 200;
            response.setHeader('Content-Type', 'application/json');
            response.end(JSON.stringify({ ok: true, file: 'public/content/site-content.json' }));
          } catch (error) {
            response.statusCode = 500;
            response.setHeader('Content-Type', 'application/json');
            response.end(
              JSON.stringify({
                ok: false,
                error: error instanceof Error ? error.message : 'Unknown error'
              })
            );
          }
        });
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), localContentSavePlugin()],
  base: process.env.VITE_BASE_PATH?.trim() || '/'
});
