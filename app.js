const express = require("express");
const session = require("express-session");
const app = new express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/upload", express.static("upload"));
const admin = require("./router/admin");
const index = require("./router/index");
app.use(
    session({
        secret: "keybord cat",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 30
        },
        rolling: true
    })
);
app.use("/admin", admin);
app.use("/", index);
app.listen(3000, "127.0.0.1");
