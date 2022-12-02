declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      ADMIN_SECRET: string;
      FACTORY_ADDRESS: string;
      GANACHE_SEED: string;
      GANACHE_URL: string;
      MONGO_URL: string;
      RPC_PROVIDER_URL: string;
    }
  }
}

export {};
