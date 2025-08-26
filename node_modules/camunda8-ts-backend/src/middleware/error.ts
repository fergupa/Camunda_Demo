import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
	const status = err?.status || 500;
	const message = err?.message || "Internal Server Error";
	if (status >= 500) {
		// Log server errors
		console.error("Unhandled error:", err);
	}
	res.status(status).json({ error: message });
};
