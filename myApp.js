let express = require("express");
require("dotenv").config();
const path = require("path");
let app = express();
const webpageFilePath = path.join(
  __dirname,
  path.normalize("/views/index.html")
);

const pathToPublicDir = path.join(__dirname, "/public");
const jsonRes = {
  message: "Hello json",
};

app.use(express.static(pathToPublicDir));
app.use("/public", express.static(pathToPublicDir));
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);

  next();
});

app.get("/", function (req, res) {
  res.sendFile(webpageFilePath);
});

app.get("/json", function (req, res) {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    res.json({
      message: "HELLO JSON",
    });
  } else {
    res.json(jsonRes);
  }
});

app.get(
  "/now",
  function (req, res, next) {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({
      time: req.time,
    });
  }
);

app.get("/:word/echo", function (req, res) {
  res.json({ echo: req.params.word });
});
module.exports = app;
