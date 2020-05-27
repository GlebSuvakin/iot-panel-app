var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var urlencodedParser = bodyParser.urlencoded({ extended: false });


var app = express();
app.use('/static', express.static('house'))

var app = express();

app.use(express.static('house'));


//Секция маршрутизации

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/house/index.html');
});

app.get('/hw', function(req, res) {
    res.sendFile(__dirname + '/house/html/hw.html');
});

app.get('/lbby', function(req, res) {
    res.sendFile(__dirname + '/house/html/lbby.html');
});

app.get('/bdrm', function(req, res) {
    res.sendFile(__dirname + '/house/html/bdrm.html');
});

app.get('/bthrm', function(req, res) {
    res.sendFile(__dirname + '/house/html/bthrm.html');
});

app.get('/ktchn', function(req, res) {
    res.sendFile(__dirname + '/house/html/ktchn.html');
});


//Секция перехода на вкладки комнат

app.post('/hw-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/html/hw.html');
});

app.post('/lbby-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/html/lbby.html');
});

app.post('/bdrm-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/html/bdrm.html');
});

app.post('/bthrm-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/html/bthrm.html');
});

app.post('/ktchn-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/html/ktchn.html');
});

app.post('/main-go', urlencodedParser, function(req, res) {
    res.sendFile(__dirname + '/house/index.html');
});


//Секция отправки простых команд

app.post('/hw-door-lock-on', function(req, res) {
    mqtt.publish('hw-controller.hw-door', '1')
});

app.post('/hw-door-lock-off', function(req, res) {
    mqtt.publish('hw-controller.hw-door', '0')
});

app.post('/hw-security-on', function(req, res) {
    mqtt.publish('hw-controller.hw-security', '1')
});

app.post('/hw-security-off', function(req, res) {
    mqtt.publish('hw-controller.hw-security', '0')
});

app.post('/lbby-security-on', function(req, res) {
    mqtt.publish('lbby-controller.lbby-scr', '1')
});

app.post('/lbby-security-off', function(req, res) {
    mqtt.publish('lbby-controller.lbby-scr', '0')
});

app.post('/lbby-window-open', function(req, res) {
    mqtt.publish('lbby-controller.lbby-window', '0')
});

app.post('/lbby-window-close', function(req, res) {
    mqtt.publish('lbby-controller.lbby-window', '1')
});

app.post('/bdroom-security-on', function(req, res) {
    mqtt.publish('bdrm-controller.bdrm-scr', '1')
});

app.post('/bdroom-security-off', function(req, res) {
    mqtt.publish('bdrm-controller.bdrm-scr', '0')
});

app.post('/bdroom-window-open', function(req, res) {
    mqtt.publish('bdrm-controller.bdrm-window', '0')
});

app.post('/bdroom-window-close', function(req, res) {
    mqtt.publish('bdrm-controller.bdrm-window', '1')
});

app.post('/ktchn-fan-on', function(req, res) {
    mqtt.publish('ktchn-controller.ktchn-fan', '1')
});

app.post('/ktchn-fan-off', function(req, res) {
    mqtt.publish('ktchn-controller.ktchn-fan', '0')
});

app.post('/ktchn-cooker-on', function(req, res) {
    mqtt.publish('ktchn-controller.ktchn-cooker', '1')
});

app.post('/ktchn-cooker-off', function(req, res) {
    mqtt.publish('ktchn-controller.ktchn-cooker', '0')
});

app.post('/bthroom-fan-on', function(req, res) {
    mqtt.publish('bthrm-controller.bthrm-fan', '1')
});

app.post('/bthroom-fan-off', function(req, res) {
    mqtt.publish('bthrm-controller.bthrm-fan', '0')
});

//Секция отправки json запросов из форм

app.post('/hw-send', urlencodedParser, function(req, res) {
    var obj = JSON.stringify(req.body);
    console.log(obj); // { title: 'product' }
    mqtt.publish('hw-controller', obj);
    res.sendFile(__dirname + '/house/html/hw.html');
});

app.post('/lbby-send', urlencodedParser, function(req, res) {
    var obj = JSON.stringify(req.body);
    console.log(obj);
    mqtt.publish('lbby-controller', obj);
    res.sendFile(__dirname + '/house/html/lbby.html');
});

app.post('/bdrm-send', urlencodedParser, function(req, res) {
    var obj = JSON.stringify(req.body);
    console.log(obj);
    mqtt.publish('bdrm-controller', obj);
    res.sendFile(__dirname + '/house/html/bdrm.html');
});

app.post('/bthrm-send', urlencodedParser, function(req, res) {
    var obj = JSON.stringify(req.body);
    console.log(obj);
    mqtt.publish('bthrm-controller', obj);
    res.sendFile(__dirname + '/house/html/bthrm.html');
});

app.post('/ktchn-send', urlencodedParser, function(req, res) {
    var obj = JSON.stringify(req.body);
    console.log(obj);
    mqtt.publish('ktchn-controller', obj);
    res.sendFile(__dirname + '/house/html/ktchn.html');
});

//Эмуляция неуправляемых процессов

setInterval(() => {
    mqtt.publish('bthrm-controller', JSON.stringify({
        "bthrm-humidity": (Math.random() * 99).toFixed(2),
    }));
}, 10000);


//Секция подключения к брокеру

app.listen('8080');

const mqtt = require('mqtt').connect('mqtt://dev.rightech.io', {
    clientId: process.env.MQTT_CLIENTID || 'mqtt-darkgleb485-8is32w-obj1'
});

mqtt.on('connect', () => {
    console.log(`${new Date}: connected`);
});