var express = require('express');
var router = express.Router();

const userManager = require('../userManager.js');
const chatManager = require('../chatManager.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.status(200).send({
        status: true,
        message: 'Welcome to API',
        version: '1.0.1'
    });
});

router.post('/login', async function (req, res, next) {
    console.log("Login isteği geldi");
    const username = req.body.username;
    const password = req.body.password;

    let result = await userManager.login({ username, password });

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send(result);
    }
});

router.get('/getUsers/:nexttoken', async function (req, res, next) {
    console.log("getUsers isteği geldi");
    let nexttoken = req.params.nexttoken;

    let result = await chatManager.getUsers({ nexttoken });

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send(result);
    }
});

router.get('/getMessages/:chatToken/:nexttoken', async function (req, res, next) {
    console.log("getUsers isteği geldi");
    let nexttoken = req.params.nexttoken;
    let chatToken = req.params.chatToken;

    let result = await chatManager.getMessages({ chatToken, nexttoken });

    if (result) {
        res.status(200).send(result);
    } else {
        res.status(400).send(result);
    }
});

module.exports = router;