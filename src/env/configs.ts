const envConfigs = {
  development: {
    databaseFile: 'dev.db.sqlite3',
    currentEnv: 'development',
  },
  test: {
    databaseFile: 'int.test.db.sqlite3',
    currentEnv: 'test',
  },
  e2e: {
    databaseFile: 'e2e.db.sqlite3',
    currentEnv: 'e2e',
  },
  production: {
    databaseFile: 'prod.db.sqlite3',
    currentEnv: 'production',
  },
} as const;

type EnvConfigKeys = keyof typeof envConfigs;

const getCurrentEnv = (): EnvConfigKeys => {
  const env = process.env.CURRENT_ENV as EnvConfigKeys | undefined;
  return env && envConfigs[env] ? env : 'development';
};

export const currentEnvConfig = envConfigs[getCurrentEnv()];
