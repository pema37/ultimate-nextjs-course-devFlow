import pino from "pino";

const isEdge = process.env.NEXT_RUNTIME === "edge";
const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
  level: process.env.LOG_LEVEL || "info", // Default log level
  transport:
    !isEdge && !isProduction
      ? {
          target: "pino-pretty", // Pretty-print logs for development
          options: {
            colorize: true, // Enable colored logs
            ignore: "pid,hostname", // Exclude certain fields
            translateTime: "SYS:standard", // Use system time format
          },
        }
      : undefined, // JSON logs for production or edge runtime
  formatters: {
    level: (label) => ({ level: label.toUpperCase() }), // Uppercase log levels
  },
  timestamp: pino.stdTimeFunctions.isoTime, // ISO 8601 timestamps
});

export default logger;

