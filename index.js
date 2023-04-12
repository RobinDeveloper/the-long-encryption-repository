const express = require("express");
const bodyParser = require('body-parser');
const app = express();

let keysCount = 0;
let currentKeyString = "";

app.use(express.static(`${__dirname}/app/`));
app.use(bodyParser.json());

app.get('/keys-count', (req, res) => {
    res.json({ keysCount: keysCount });
});

app.get('/current-key-index', (req, res) => {
    res.json({ currentKey: currentKeyString });
});

app.post('/keys-checked', (req, res) => {
    keysCount = JSON.parse(req.body.keysChecked);
    res.send(`Keys checked: ${keysCount}`);
});

app.post('/current-key', (req, res) => {
    const { currentKey } = req.body;
    currentKeyString = currentKey;
    res.send(`Current key: ${currentKey}`);
});

app.listen(8080);
