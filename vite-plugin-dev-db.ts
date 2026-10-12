import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

interface UserRecord {
  id: string;
  name?: string;
  identifier: string;
  password?: string;
  role: 'student' | 'kitchen' | 'owner';
  provider: 'password' | 'email-link' | 'google' | 'demo';
  registeredAt?: string;
  lastLoginAt: string;
}

interface ActivityRecord {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details?: Record<string, any>;
  ip?: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  activities: ActivityRecord[];
}

export function devDatabasePlugin(): Plugin {
  const dbDir = path.resolve(process.cwd(), 'database');
  const dbFile = path.resolve(dbDir, 'dev-db.json');

  function initDb(): DatabaseSchema {
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    if (!fs.existsSync(dbFile)) {
      const initial: DatabaseSchema = {
        users: [
          {
            id: 'usr_demo_student',
            name: 'John Doe (Demo Student)',
            identifier: 'student@campus.edu',
            password: 'campus@2026',
            role: 'student',
            provider: 'password',
            registeredAt: '2026-10-10T10:00:00.000Z',
            lastLoginAt: '2026-10-10T10:00:00.000Z'
          },
          {
            id: 'usr_demo_kitchen',
            name: 'Head Chef (Demo Kitchen)',
            identifier: 'kitchen@campus.edu',
            password: 'demoPass123',
            role: 'kitchen',
            provider: 'password',
            registeredAt: '2026-10-10T10:00:00.000Z',
            lastLoginAt: '2026-10-10T10:00:00.000Z'
          },
          {
            id: 'usr_demo_owner',
            name: 'Canteen Admin (Demo Owner)',
            identifier: 'admin@campus.edu',
            password: 'demoPass123',
            role: 'owner',
            provider: 'password',
            registeredAt: '2026-10-10T10:00:00.000Z',
            lastLoginAt: '2026-10-10T10:00:00.000Z'
          }
        ],
        activities: [
          {
            id: 'act_init_1',
            timestamp: new Date().toISOString(),
            user: 'system',
            role: 'system',
            action: 'DATABASE_INITIALIZED',
            details: { message: 'Developer live auditing database initialized' }
          }
        ]
      };
      fs.writeFileSync(dbFile, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    try {
      const raw = fs.readFileSync(dbFile, 'utf-8');
      return JSON.parse(raw);
    } catch {
      return { users: [], activities: [] };
    }
  }

  function saveDb(data: DatabaseSchema) {
    fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf-8');
  }

  return {
    name: 'vite-plugin-dev-database',
    configureServer(server) {
      initDb();

      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith('/api/db')) {
          return next();
        }

        const parseBody = (callback: (body: any) => void) => {
          let chunks = '';
          req.on('data', (c) => (chunks += c));
          req.on('end', () => {
            try {
              callback(chunks ? JSON.parse(chunks) : {});
            } catch {
              callback({});
            }
          });
        };

        res.setHeader('Content-Type', 'application/json');

        // GET /api/db/export
        if (req.method === 'GET' && req.url === '/api/db/export') {
          const db = initDb();
          res.end(JSON.stringify(db, null, 2));
          return;
        }

        // POST /api/db/auth-event (Login or Register record)
        if (req.method === 'POST' && req.url === '/api/db/auth-event') {
          parseBody((body) => {
            const db = initDb();
            const { name, identifier, password, role, provider, eventType, details } = body;
            const now = new Date().toISOString();

            let user = db.users.find((u) => u.identifier.toLowerCase() === (identifier || '').toLowerCase());
            if (!user) {
              user = {
                id: `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
                name: name || identifier?.split('@')[0] || 'User',
                identifier: identifier || 'anonymous',
                password: password || undefined,
                role: role || 'student',
                provider: provider || 'password',
                registeredAt: now,
                lastLoginAt: now
              };
              db.users.push(user);
            } else {
              user.lastLoginAt = now;
              if (name && !user.name) user.name = name;
              if (password) user.password = password;
              if (role) user.role = role;
              if (provider) user.provider = provider;
            }

            db.activities.unshift({
              id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              timestamp: now,
              user: user.name || user.identifier,
              role: user.role,
              action: eventType === 'register' ? 'USER_REGISTERED' : 'USER_LOGGED_IN',
              details: {
                identifier: user.identifier,
                provider: user.provider,
                ...(details || {})
              }
            });

            saveDb(db);
            res.end(JSON.stringify({ success: true, user }));
          });
          return;
        }

        // POST /api/db/activity (General user activity log)
        if (req.method === 'POST' && req.url === '/api/db/activity') {
          parseBody((body) => {
            const db = initDb();
            const { user, role, action, details } = body;
            const now = new Date().toISOString();

            db.activities.unshift({
              id: `act_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
              timestamp: now,
              user: user || 'guest',
              role: role || 'student',
              action: action || 'PAGE_VIEW',
              details: details || {}
            });

            // Keep max 500 activities to prevent infinite ballooning
            if (db.activities.length > 500) {
              db.activities = db.activities.slice(0, 500);
            }

            saveDb(db);
            res.end(JSON.stringify({ success: true }));
          });
          return;
        }

        next();
      });
    }
  };
}
