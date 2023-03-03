/// <reference types="react-scripts" />

declare namespace NodeJS {
  export interface ProcessEnv {
    REACT_APP_ENVIRONMENT: "local" | "production";
    REACT_APP_API_URL: string;
    REACT_APP_SERVER_PORT: number;
  }
}

declare module "*.css";
