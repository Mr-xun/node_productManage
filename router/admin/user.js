const express = require("express");
const router = new express.Router();
const multiparty = require("multiparty");
const fs = require("fs");
const DB = require("../../modules/db");
const MD5 = require("md5-node");
router.get("/", (req, res) => {
    DB.find("user", {}, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            res.render("admin/user/index", { list: data });
        }
    });
});
router.get("/add", (req, res) => {
    res.render("admin/user/add");
});
router.get("/edit", (req, res) => {
    //获取get传值id
    let id = req.query.id;
    DB.find("user", { _id: new DB.ObjectID(id) }, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            res.render("admin/user/edit", { list: data[0] });
        }
    });
});
router.post("/doAdd", (req, res) => {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        //获取提交的数据以及图片上传成功返回的图片的信息
        // console.log(fields);
        // console.log(fields); //图片上传成功返回的地址信息
        let username = fields.username[0];
        let password = MD5(fields.password[0]);
        let sex = fields.sex[0];
        DB.insertOne(
            "user",
            { username, password, sex },
            (err, data) => {
                if (!err) {
                    res.redirect("/admin/user"); //上传成功返回列表页
                }
            }
        );
    });
});
router.post("/doEdit", (req, res) => {
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return false;
        }
        let id = fields._id[0];
        let username = fields.username[0];
        let password = MD5(fields.password[0]);
        let sex = fields.sex[0];
        DB.updateOne(
            "user",
            { _id: new DB.ObjectID(id) },
            { username, password, sex },
            (err, data) => {
                if (!err) {
                    res.redirect("/admin/user");
                }
            }
        );
    });
});
//删除商品
router.get("/del", (req, res) => {
    let id = req.query.id;
    DB.deleteOne("user", { _id: new DB.ObjectID(id) }, err => {
        if (!err) {
            console.log("删除成功");
            res.redirect("/admin/user");
        }
    });
});

module.exports = router;
