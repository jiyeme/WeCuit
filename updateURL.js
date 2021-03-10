// npm install jimp qrcode-reader
const decodeImage = require("jimp").read;
const qrcodeReader = require("qrcode-reader");
qrDecode("qrcode.png", function (url) {
    console.log(url);
    var http = require("http");

    var qs = require("querystring");

    var data = {
        url: url
    }; //这是需要提交的数据

    var content = qs.stringify(data);

    var options = {
        hostname: "cuit.api.jysafe.cn",
        port: 80,
        path: "/api/sys/qrCode/action/update/type/qq?" + content,
        method: "GET",
    };

    var req = http.request(options, function (res) {
        console.log("STATUS: " + res.statusCode);
        console.log("HEADERS: " + JSON.stringify(res.headers));
        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            console.log("BODY: " + chunk);
        });
    });

    req.on("error", function (e) {
        console.log("problem with request: " + e.message);
    });

    req.end();
});
function qrDecode(data, callback) {
    decodeImage(data, function (err, image) {
        if (err) {
            callback(false);
            return;
        }
        let decodeQR = new qrcodeReader();
        decodeQR.callback = function (errorWhenDecodeQR, result) {
            if (errorWhenDecodeQR) {
                callback(false);
                return;
            }
            if (!result) {
                callback(false);
                return;
            } else {
                callback(result.result);
            }
        };
        decodeQR.decode(image.bitmap);
    });
}
