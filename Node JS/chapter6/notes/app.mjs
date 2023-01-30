import { default as express } from "express";
import { default as hbs } from "hbs";
import * as path from "path";
// import * as favicon from 'serve-favicon';
import { default as logger } from "morgan";
import { default as cookieParser } from "cookie-parser";
import { default as bodyParser } from "body-parser";
import * as http from "http";
import { default as cors } from "cors";
import { approotdir } from "./approotdir.mjs";
const __dirname = approotdir;
import { normalizePort, onError, onListening, handle404, basicErrorHandler } from "./appsupport.mjs";
import { router as indexRouter } from "./routes/index.mjs";
import { router as notesRouter } from "./routes/notes.mjs";
import { default as rfs } from "rotating-file-stream";
import { default as DBG } from 'debug';
import { useModel as useNotesModel } from './models/notes-store.mjs';
//debugging is enabled
export const debug = DBG('notes:debug');
export const dbgerror = DBG('notes:error');


export const app = express();
useNotesModel(process.env.NOTES_MODEL ? process.env.NOTES_MODEL : 'memory')
 .then(store => { })
 .catch(error => { onError({ code: 'ENOTESSTORE', error }); });
 
//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "partials"));

//bootstrap
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets/vendor/bootstrap", express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));
app.use("/assets/vendor/jquery", express.static(path.join(__dirname, "node_modules", "jquery", "dist")));
app.use("/assets/vendor/popper.js", express.static(path.join(__dirname, "node_modules", "popper.js", "dist", "umd")));

app.use("/assets/vendor/feather-icons", express.static(path.join(__dirname, "node_modules", "feather-icons", "dist")));

//cross domain support
app.use(cors());

//logging with morgan
// app.use(logger("dev"));
app.use(
  // logger("common", {
  // logger('common' || "dev", {
  logger(process.env.REQUEST_LOG_FORMAT || "dev", {
    stream: process.env.REQUEST_LOG_FILE
      ? rfs.createStream(process.env.REQUEST_LOG_FILE, {
          size: "10M", // rotate every 10 MegaBytes written
          interval: "1d", // rotate daily
          compress: "gzip", // compress rotated files
        })
      : process.stdout,
  })
);

if (process.env.REQUEST_LOG_FILE) {
  app.use(logger(process.env.REQUEST_LOG_FORMAT || "dev"));
}

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
server.on("request", (req, res) => {
  debug(`${new Date().toISOString()} request ${req.method}
 ${req.url}`);
});
