//操作数据库模块
const MongoClient = require("mongodb").MongoClient;
const DBUrl = "mongodb://127.0.0.1:27017";
const ObjectID = require("mongodb").ObjectID;
function __connectDB(callback) {
    MongoClient.connect(DBUrl, { useNewUrlParser: true }, (err, client) => {
        if (err) {
            console.log("数据库连接失败");
            return false;
        }
        let db = client.db("productmanage");
        callback(db);
        client.close();
    });
}
//查找
//db.collection('user).find({})
exports.find = function(collectionname, json, callback) {
    __connectDB(db => {
        let result = db.collection(collectionname).find(json);
        result.toArray((err, data) => {
            callback(err, data);
        });
    });
};
//增加
exports.insertOne = function(collectionname, json, callback) {
    __connectDB(db => {
        db.collection(collectionname).insertOne(json, (err, data) => {
            callback(err, data);
        });
    });
};
//修改
exports.updateOne = function(collectionname, json1, json2, callback) {
    __connectDB(db => {
        db.collection(collectionname).updateOne(
            json1,
            { $set: json2 },
            (err, data) => {
                callback(err, data);
            }
        );
    });
};
//删除
exports.deleteOne = function(collectionname, json, callback) {
    __connectDB(db => {
        db.collection(collectionname).deleteOne(json, (err, data) => {
            callback(err, data);
        });
    });
};
exports.ObjectID = ObjectID; //暴露ObjectID
