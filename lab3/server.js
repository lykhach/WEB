const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
var path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
    app.use(express.static(__dirname + '/src'));
    next();
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/history', function (req, res) {
    res.sendFile(path.join(__dirname + '/history.html'));
});

app.post('/send', function (req, res) {
    fs.readFile('./src/history.json', 'utf8', function(err, resData) {
        var obj = JSON.parse(resData);
        const count = parseInt(obj.count);
        const data = req.body.data;

        obj.name[obj.count] = data.name;
        obj.password[obj.count] = data.password;
        obj.passwordConfirmation[obj.count] = data.passwordConfirmation;
        obj.date[obj.count] = data.date;
        obj.num[obj.count] = data.num;
        obj.numr[obj.count] = data.numr;
        obj.count = String(parseInt(obj.count) + 1);

        var json = JSON.stringify(obj);
        fs.writeFile('./src/history.json', json, function() {
            res.end();
        });
    });

    res.send('POST request to the homepage');
});

app.listen(3000);
