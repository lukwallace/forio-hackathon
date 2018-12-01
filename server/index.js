const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const request = require('request-promise-native');
const nluHelper = require('./nlu-helper');
const json = require('./env.json');
const env = Object.assign(json, process.env);


const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

const SERVER_ERROR = 500;
const OK = 200;

const handleError = (e, res) => {
    return res.status(SERVER_ERROR).json({ errors: [e] });
};

app.post('/evaluate', (req, res, next) => {
    return nluHelper.analyze(req.body)
        .then((analysis) => res.status(OK).json(analysis))
        .catch((err) => handleError(err, res));
});

app.use(express.static(path.join(__dirname, env.STATIC)));
app.listen(env.PORT, () => {
    console.info('Express started on port', env.PORT);
});
