const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
// const { default: cookieValidator } = require("./cookieValidator");
const cookieValidator = require("./cookieValidator");

const downloadpath = path.join(__dirname, "public/images/1.png");

async function validateCookies(req, res, next) {
  await cookieValidator(req.cookies);
  next();
}

const myLogger = (req, res, next) => {
  console.log("LOGGED: ", downloadpath);
  const pathUrl = req.path;
  if (pathUrl !== "/") {
    res.download(downloadpath, "1.png", function (err) {
      if (err) {
        console.dir(err);
      }
    });
  } else {
    next();
  }

  // res.download(downloadpath)
};

const requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// app.use(myLogger);
// app.use(requestTime);
// app.use(cookieParser());
// app.use(validateCookies);
app.use(myLogger);
app.use("/static", express.static("public"));
app.use("/images", express.static("public/images"));

app.use((err, req, res, next) => {
  console.log(path.join(__dirname, "public/images/1.png"));
  res.status(400).send(err.message);
});

app.get("/dd", (req, res) => {
  let responsetext = "Hello World!<br>";
  responsetext += `<small>Requested at: ${req.requestTime}</small>`;
  res.send(responsetext);
});

app.listen(4000);
