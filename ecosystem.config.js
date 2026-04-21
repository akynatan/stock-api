module.exports = {
  apps: [
    {
      name: 'stock-api',
      script: './node_modules/.bin/ts-node-dev',
      args: '-r tsconfig-paths/register --transpile-only --no-notify src/shared/infra/http/server.ts',
      cwd: '/root/app/stock-api',
      env: {
        NODE_ENV: 'production',
        PORT: 4444,
      },
    },
  ],
};
