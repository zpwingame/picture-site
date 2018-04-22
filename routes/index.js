var express = require('express');
var router = express.Router();
var path = require('path');

var qiniu = require('qiniu');
let {
    accessKey,
    secretKey,
    bucket,
    urlDomain,
} = require(path.join(__dirname,'../','config.json'))
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var config = new qiniu.conf.Config();
var bucketManager = new qiniu.rs.BucketManager(mac, config);

router.get('/', async function (req, res, next) {
    var result = ['life','fe']
    res.render('home', {
        title: '图片',
        result: result
    });
});
router.get('/:name', async function (req, res, next) {
    var options = {
        limit: 100,
        prefix: req.params.name,
    };

    let result = await new Promise((resolve) => {
        bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
            if (err) {
                console.log(err);
                throw err;
            }
            if (respInfo.statusCode == 200) {
                let result = [];
                var items = respBody.items;
                items.forEach(function (item) {
                    result.push(urlDomain + '/' + item.key);
                });
                console.log(result)
                resolve(result)
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
            }
        });
    })
    res.render('index', {
        title: '图片',
        result: result
    });
});

module.exports = router;