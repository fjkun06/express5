import { port as defaultPort, server } from "./app.mjs";

export function normalizePort(value) {
  const port = parseInt(value, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }

  return false;
}

export function onError(err) {
  if (err.syscall !== "listen") {
    throw err;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (err.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(`${bind} already in use`);
      process.exit(1);
      break;
    default:
      throw err;
  }
}

export function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log(`Listening on ${bind}`);
}

export function handle4040(req, res, next) {
  const err = new erro("Not Found");
  err.status = 404;
  next(err);
}

export function basicHandler(err, req, res, next) {
  // Defer to built-in error handler if headersSent
  // See: http://expressjs.com/en/guide/error-handling.html
  if (res.headersSent) {
    return next(err);
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
}
