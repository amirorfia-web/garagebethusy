// PM2 Configuration — Process Manager pour production
// Lancer avec: pm2 start ecosystem.config.js

module.exports = {
  apps: [
    {
      name: 'garage-bethusy',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      cwd: './',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        ADMIN_PASSWORD: 'CHANGEZ_CE_MOT_DE_PASSE',
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
    },
  ],
}
