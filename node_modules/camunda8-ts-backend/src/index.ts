import "dotenv/config";
import express from "express";
import cors from "cors";
import processRoutes from "./routes/process.routes.js";
import type { Request, Response } from "express";
import { errorHandler } from "./middleware/error.js";
import { getEnv } from "./config/env.js";

const app = express();
app.use(cors());
app.use(express.json());

// Validate required env vars on startup
getEnv();

app.get("/health", (_req: Request, res: Response) => res.json({ ok: true }));

// Mount API routes under /api
app.use("/api", processRoutes);

// Basic error handler placeholder (can be moved to middleware/error.ts)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(errorHandler);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});