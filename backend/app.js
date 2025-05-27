
import express from "express";
import clientsRoutes from "./src/routes/ClientsRoutes.js";
import gamesRoutes from "./src/routes/GamesRoutes.js";
import cors from "cors"
import cookieParser from "cookie-parser";

// ... otras importaciones y configuraciones

const app = express();

app.use(
  cors({
    origin: "*",
    // Permitir envío de cookies y credenciales
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/clients", clientsRoutes);
app.use("/api/games", gamesRoutes);

export default app;
