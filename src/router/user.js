const express = require('express');
const jwt = require('jsonwebtoken');
const userRuter = express.Router();
const secretKey = require('../secretKey/key');

let jwtPayload = {
    userName: undefined,
    isAdmin: false,
    isVip: false
}
let jwtOption = {
    expiresIn: '2 days'
}

userRuter.post('/check', (req, res)=>{
    const {user, password} = req.body;
    if (user === 'admin' && password === '123') {
        jwtPayload.userName = user;
        let token = jwt.sign(jwtPayload, secretKey, jwtOption)
        res.json({ code: 1, token, msg: '登录成功' });
    } else {
        res.json({ code: 0, msg: '用户名或密码有误' });
    }
})

module.exports = userRuter;