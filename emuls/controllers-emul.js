const mqtt = require('mqtt').connect('mqtt://dev.rightech.io', {
    clientId: process.env.MQTT_CLIENTID || 'mqtt-darkgleb485-8is32w-obj1'
});

var sensors = [
    'hw-controller',
    'lbby-controller',
    'bdrm-controller',
    'bthrm-controller',
    'ktchn-controller'
];


mqtt.on('connect', () => {
    console.log(`${new Date}: connected`);
    sensors.forEach(element => {
        mqtt.subscribe(element);
    });
});

setInterval(() => {
    mqtt.publish('hw-controller', JSON.stringify({
        "hw-temp": Math.floor((Math.random() * (30 - 25) + 25)),
        "hw-light": (Math.random() * (50 - 40) + 40).toFixed(2),
    }));
}, 5000);

setInterval(() => {
    mqtt.publish('lbby-controller', JSON.stringify({
        "lbby-light": Math.floor((Math.random() * (50 - 40) + 40)),
        "lbby-media": Math.floor((Math.random() * (55 - 50) + 50)),
        "lbby-temp": Math.floor((Math.random() * (30 - 25) + 25)),
    }));
}, 5000);

setInterval(() => {
    mqtt.publish('bdrm-controller', JSON.stringify({
        "bdrm-temp": (Math.random() * (30 - 25) + 25).toFixed(2),
        "bdrm-light": Math.floor((Math.random() * (150 - 140) + 140)),
    }));
}, 5000);

setInterval(() => {
    mqtt.publish('bthrm-controller', JSON.stringify({
        "bthrm-light": Math.floor((Math.random() * (50 - 40) + 40)),
        "bthrm-humidity": (Math.random() * 99).toFixed(2),
    }));
}, 5000);

setInterval(() => {
    mqtt.publish('ktchn-controller', JSON.stringify({
        "ktchn-light": Math.floor((Math.random() * (150 - 140) + 140)),
    }));
}, 5000);