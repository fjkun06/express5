const path = require("path");
const express = require("express");
const app = express();
const downloadpath = path.join(__dirname, "public/images/1.png");


app.get("/", (req, res) => res.send(`<a href="/public/images/1.png">download</a>`));
app.get("/xxx", (req, res) => res.redirect('http://google.com'));
app.get("/view", (req, res) => res.render('public/index.html', function(err,html){
  res.send(html)
}));

app.get("*", (req, res) => {
    res.download(path.join(__dirname, "public/images/1.png"), "1.png", err => {
        if (err) console.log(err);
    });
});

app.listen(3001);