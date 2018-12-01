const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
const request = require('request-promise-native');
const json = require('./env.json');
const env = Object.assign(json, process.env);

class NLUHelper {
    constructor() {
        this.nlu = new NaturalLanguageUnderstandingV1({
            url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/',
            version: '2018-09-21',
            iam_apikey: env.NLU_API_KEY,
        });       
    }
    analyze(payload) {
        return new Promise((resolve, reject) => this.nlu.analyze(payload, (err, res) => err ? reject(err) : resolve(res)));
    }
}
const nluHelper = new NLUHelper();
module.exports = nluHelper;
