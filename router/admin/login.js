let express = require("express");
let router = express.Router();
const bodyParser = require("body-parser");
const DB = require("../../modules/db");
const MD5 = require("md5-node");
router.use(bodyParser.urlencoded({ extended: false }));
router.get("/", (req, res) => {
    res.render("admin/login");
});
router.post("/doLogin", (req, res) => {
    //获取数据
    //链接数据库查询数据
    let username = req.body.username;
    let password = MD5(req.body.password);
    DB.find("user", { username: username, password: password }, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            if (data.length) {
                console.log("登录成功");
                //保存登录信息
                req.session.userinfo = data[0];
                res.redirect("/admin/product"); //登陆成功
            } else {
                console.log("暂无该用户");
                res.send(
                    "<script>alert('登录失败');location.href='/admin/login';</script>"
                );
            }
        }
    });
});
router.get("/out", (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/admin/login");
        }
    });
});
module.exports = router;
