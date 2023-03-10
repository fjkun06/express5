import { default as express } from "express";
import { default as hbs } from "hbs";
import * as path from "path";
// import * as favicon from 'serve-favicon';
import { default as logger } from "morgan";
import { default as cookieParser } from "cookie-parser";
import { default as bodyParser } from "body-parser";
import * as http from "http";
import {default as cors} from "cors";
import { approotdir } from "./approotdir.mjs";
const __dirname = approotdir;
import { normalizePort, onError, onListening, handle404, basicErrorHandler } from "./appsupport.mjs";
import { router as indexRouter } from "./routes/index.mjs";
import { InMemoryNotesstore } from "./models/notes-memory.mjs";
import { router as notesRouter } from "./routes/notes.mjs";

export const app = express();
export const NotesStore = new InMemoryNotesstore();

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "partials"));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Router function lists
app.use("/", indexRouter);
app.use("/notes", notesRouter);

//error handlers
//catch 404 and forward to error handler
app.use(handle404);
app.use(basicErrorHandler);

export const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

//creating server instance
export const server = http.createServer(app);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
