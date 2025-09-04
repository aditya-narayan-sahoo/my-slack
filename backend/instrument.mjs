import * as Sentry from "@sentry/node";
import ENV from "./src/config/env.js";

Sentry.init({
  dsn: ENV.SENTRY_DSN || undefined,
  enabled: Boolean(ENV.SENTRY_DSN),
  environment: ENV.NODE_ENV || "development",
  release: process.env.SENTRY_RELEASE || process.env.GIT_SHA || undefined,
  // dial down in prod
  tracesSampleRate: ENV.NODE_ENV === "production" ? 0.1 : 1.0,
  profilesSampleRate: ENV.NODE_ENV === "production" ? 0.1 : 1.0,
  includeLocalVariables: ENV.NODE_ENV !== "production",
});
