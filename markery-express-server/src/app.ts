require("./database/connect");

// Express
import express, { Application } from "express";

// Middleware
import bodyParser from "body-parser";

// Router instance
import { AppRouter } from "./AppRouter";

// Route controllers
import "./controllers/AuthController";
import "./controllers/FolderController";
import "./controllers/UrlContronller";

// Instantiate express application
const app: Application = express();

// Apply middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(AppRouter.getInstance());

export { app };
