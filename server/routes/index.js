var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).send({
        status: true,
        message: 'Welcome to API',
        version: '1.0.1'
    });
});

router.post('/login', async function (req, res, next) {
    try {
        console.log("Login isteği geldi");
        const username = req.body.username;
        const password = req.body.password;

        const decoded = Buffer.from(username + ":" + password, 'utf8').toString('base64');
        const config = {
            method: 'get',
            url: new URL('/ocs/v2.php/core/getapppassword', process.env.NEXTCLOUD_URL).href,
            headers: {
                'OCS-APIRequest': 'true',
                'Authorization': 'Basic ' + decoded,
            }
        };

        await axios(config);

        let result = { status: true, data: "Giriş Başarılı", login: true }

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (error.response != undefined && error.response.status == 401) {
            res.status(200).send({ status: true, data: "şifre yanlış", login: false });
        } else {
            res.status(200).send({ status: false, data: "Hata", login: false, message: error });
        }
    }
});

module.exports = router;