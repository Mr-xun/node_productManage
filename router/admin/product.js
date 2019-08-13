const express = require("express");
const router = new express.Router();
const multiparty = require("multiparty");
const fs = require("fs");
const DB = require("../../modules/db");
router.get("/", (req, res) => {
    DB.find("productList", {}, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            res.render("admin/product/index", { list: data });
        }
    });
});
router.get("/add", (req, res) => {
    res.render("admin/product/add");
});
router.get("/edit", (req, res) => {
    //获取get传值id
    let id = req.query.id;
    DB.find("productList", { _id: new DB.ObjectID(id) }, (err, data) => {
        if (err) {
            console.log(err);
            return false;
        } else {
            res.render("admin/product/edit", { list: data[0] });
        }
    });
});
router.post("/doAdd", (req, res) => {
    var form = new multiparty.Form();
    form.uploadDir = "upload"; //上传图保存的地址，目录必须存在
    form.parse(req, function(err, fields, files) {
        //获取提交的数据以及图片上传成功返回的图片的信息
        // console.log(fields);
        // console.log(fields); //图片上传成功返回的地址信息
        let title = fields.title[0];
        let price = fields.price[0];
        let postage = fields.postage[0];
        let description = fields.description[0];
        let icon = files.icon[0].path;
        DB.insertOne(
            "productList",
            { title, price, postage, description, icon },
            (err, data) => {
                if (!err) {
                    res.redirect("/admin/product"); //上传成功返回列表页
                }
            }
        );
    });
});
router.post("/edit", (req, res) => {
    let form = new multiparty.Form();
    form.uploadDir = "upload";
    form.parse(req, (err, fields, files) => {
        if (err) {
            console.log(err);
            return false;
        }
        let id = fields._id[0];
        let title = fields.title[0];
        let price = fields.price[0];
        let postage = fields.postage[0];
        let description = fields.description[0];
        let icon = files.icon[0].path;
        let originalFilename = files.icon[0].originalFilename;
        if (originalFilename) {
            var setData = { title, price, postage, description, icon };
        } else {
            var setData = { title, price, postage, description };
            //删除临时文件
            fs.unlink(icon);
        }
        console.log(fields, files);
        DB.updateOne(
            "productList",
            { _id: new DB.ObjectID(id) },
            setData,
            (err, data) => {
                if (!err) {
                    res.redirect("/admin/product");
                }
            }
        );
    });
});
//删除商品
router.get("/del", (req, res) => {
    let id = req.query.id;
    DB.deleteOne("productList", { _id: new DB.ObjectID(id) }, err => {
        if (!err) {
            console.log("删除成功");
            res.redirect("/admin/product");
        }
    });
});

module.exports = router;
