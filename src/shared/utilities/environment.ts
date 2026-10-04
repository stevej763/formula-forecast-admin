const appEnv = (import.meta.env.VITE_APP_ENV ?? "").toLowerCase();

export const isProduction = appEnv === "prod" || appEnv === "production";

export const environmentName = isProduction
  ? "Production"
  : appEnv === "demo"
    ? "Demo"
    : appEnv === "dev"
      ? "Development"
      : "Local";
