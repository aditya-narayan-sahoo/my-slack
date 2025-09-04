import express from "express";
import * as Sentry from "@sentry/node";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import "../instrument.mjs";
import ENV from "./config/env.js";
import connectDB from "./config/db.js";
import { functions, inngest } from "./config/inngest.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware()); // req.auth will be available in the request object

app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

if (ENV.NODE_ENV !== "production") {
  app.get("/debug-sentry", (req, res) => {
    throw new Error("My first Sentry error!");
  });
}

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server running on port: ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.error(`Error starting server: ${error}`);
    process.exit(1);
  }
};

startServer();
export default app;
