let express = require("express");
let router = express.Router();
let login = require("./admin/login");
let product = require("./admin/product");
let user = require("./admin/user");
//中间件，判断登录状态
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
router.use("/login", login);
router.use("/product", product);
router.use("/user",user)
module.exports = router;
