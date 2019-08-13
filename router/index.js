let express = require("express");
let router = express.Router();
router.use((req, res, next) => {
    if (req.url == "/login" || req.url == "/login/doLogin") {
        next();
    } else {
        // app.locals 全局
        // req.app.locals 请求的全局
        if (req.session.userinfo && req.session.userinfo.username != "") {
            req.app.locals["userinfo"] = req.session.userinfo; //设置全局变量 可在任何模板使用
            next();
        } else {
            res.redirect("/admin/login");
        }
    }
});
router.get("/", (req, res) => {
    res.send("index");
});
router.get("/product", (req, res) => {
    res.send("product");
});
router.get("/list", (req, res) => {
    res.send("列表");
});
module.exports = router;
