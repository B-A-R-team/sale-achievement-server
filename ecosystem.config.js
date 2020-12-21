module.exports = {
  apps: [
    {
      name: 'sale-server',
      script: 'src/bin/start.ts',
      interpreter: 'node',
      interpreter_args:
        '--require ts-node/register --require tsconfig-paths/register',
    },
  ],
};
