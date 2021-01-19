const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const portNum = 2020;

// Cross Domain
let allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (req.method.toLowerCase() == 'options')
        res.send(200); // 让options请求快速结束
    else
        next();
}
app.use(allowCrossDomain);

// handle Form, Json(content-type: application/json)
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res)=>{
    res.send('Welcome to visit XFF site~');
})

app.use('/user', require('./router/user'));
app.use((req, res, next)=>{
    res.status(404).send("Sorry can't find that!");
});
app.use((err, req, res, next)=>{
    console.error(err.stack);
    if (err.name === 'UnauthorizedError') {
        res.json({code:0, msg:'token过期'});
        return;
    }
    res.status(500).send("Something broke!");
});

app.listen(portNum, ()=>{
    console.log('已启动');
})