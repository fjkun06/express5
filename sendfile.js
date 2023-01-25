const path = require("path");
const express = require("express");
const app = express();
const downloadpath = path.join(__dirname, "public/images/");

app.get("/", (req, res) => res.send(`<a href="/public/images/1.png">download</a>`));

app.get('/photos/:file', function (req, res) {
  var uid = req.params.uid
  var file = req.params.file

  // req.user.mayViewFilesFrom(uid, function (yes) {
  //   if (yes) {
      res.sendFile(downloadpath + file)
    // } else {
    //   res.status(403).send("Sorry! You can't see that.")
    // }
  })

app.listen(3002);
