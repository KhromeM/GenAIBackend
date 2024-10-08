import express, { json } from "express";
import cors from "cors";
import { createServer } from "http";
import { WebSocketServer } from "ws";
import { setupWebSocketHandlers } from "./websocket/wsHandlers.mjs";
import CONFIG from "./config.mjs";
import chatRoutes from "./server/routes/chatRoutes.mjs";
import fileRoutes from "./server/routes/fileRoutes.mjs";
import imageRoutes from "./server/routes/imageRoutes.mjs";
import credentialsRoutes from "./server/routes/credentialsRoutes.mjs";
import authMiddleware from "./server/middleware/authMiddleware.mjs";
import loggerMiddleware from "./server/middleware/loggerMiddleware.mjs";
import userMiddleware from "./server/middleware/userMiddleware.mjs";
import errorHandler from "./server/middleware/errorHandler.mjs";
import { setupErrorHandlers } from "./extra/errorHandlers.mjs";

setupErrorHandlers();

process.env["TZ"] = "UTC";

export const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(json());

app.use(loggerMiddleware);
app.use(authMiddleware);
app.use(userMiddleware);

// API Routes:
app.use("/api/chat", chatRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/image", imageRoutes);
app.use("/api/credentials", credentialsRoutes);

app.use(errorHandler);

export const server = createServer(app);

const wss = new WebSocketServer({ server: server });
setupWebSocketHandlers(wss);

server.listen(CONFIG.port, () => {
	console.log("Server is listening to port: " + CONFIG.port);
});
