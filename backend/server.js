import app from './app.js';
import connectDB from './config/db.js';
import env from './config/env.js';
import { spawn } from 'child_process';
import net from 'net';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isMongoRunning = () => new Promise((resolve) => {
  const socket = new net.Socket();
  socket.setTimeout(1000);
  socket.on('connect', () => {
    socket.destroy();
    resolve(true);
  });
  socket.on('timeout', () => {
    socket.destroy();
    resolve(false);
  });
  socket.on('error', () => {
    resolve(false);
  });
  socket.connect(27017, '127.0.0.1');
});

let mongodChild = null;

const ensureMongoDaemon = async () => {
  const running = await isMongoRunning();
  if (running) {
    console.log('[Mongo Daemon] Port 27017 already active.');
    return;
  }

  console.log('[Mongo Daemon] MongoDB not detected on port 27017. Auto-spawning local daemon...');
  const mongodPath = 'C:\\Program Files\\MongoDB\\Server\\8.2\\bin\\mongod.exe';
  const dataDir = path.join(__dirname, 'data', 'db');
  const lockFile = path.join(dataDir, 'mongod.lock');

  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Remove stale lock file if present
  if (fs.existsSync(lockFile)) {
    try {
      fs.unlinkSync(lockFile);
    } catch (e) {
      console.warn('[Mongo Daemon] Stale lock cleanup note:', e.message);
    }
  }

  if (fs.existsSync(mongodPath)) {
    mongodChild = spawn(mongodPath, ['--dbpath', dataDir, '--port', '27017', '--bind_ip', '127.0.0.1'], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    mongodChild.stdout.on('data', (data) => {
      // Keep silent unless critical
    });
    mongodChild.stderr.on('data', (data) => {
      console.error('[mongod stderr]:', data.toString());
    });
    mongodChild.on('close', (code) => {
      console.log(`[Mongo Daemon] Process closed with code ${code}`);
      mongodChild = null;
    });

    const cleanup = () => {
      if (mongodChild) {
        try {
          mongodChild.kill();
        } catch (e) {}
      }
    };
    process.on('exit', cleanup);
    process.on('SIGINT', () => { cleanup(); process.exit(); });
    process.on('SIGTERM', () => { cleanup(); process.exit(); });

    // Wait up to 10 seconds for port to open
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 500));
      if (await isMongoRunning()) {
        console.log('[Mongo Daemon] Successfully launched local MongoDB daemon on port 27017.');
        return;
      }
    }
  } else {
    console.warn('[Mongo Daemon] System mongod.exe not found at standard path.');
  }
};


const startServer = async () => {
  try {
    await ensureMongoDaemon();
    await connectDB();
    
    app.listen(env.PORT, () => {
      console.log(`[StaySignal LK Backend] Server is running on port ${env.PORT}`);
      console.log(`[StaySignal LK Backend] Health endpoint: http://localhost:${env.PORT}/api/health`);
    });
  } catch (error) {
    console.error('[StaySignal LK Backend] Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
