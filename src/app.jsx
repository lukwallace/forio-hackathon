import React, { Component, Fragment } from 'react';
import { LineChart } from 'components';
import 'normalize.css/normalize.css';
import 'css/main.scss';

const analyzeSentiment = (text) => {
    return fetch('/evaluate', {
        method: 'POST',
        credentials: 'include',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            language: 'en',
            text,
            features: {
                sentiment: {},
            },
        }),
    })
        .then((res) => res.json())
        .catch((err) => console.error('Error: network call failed', err));
};

const initialState = {
    input: '',
    error: '',
    data: [{
        originalText: 'You wanted me. Here I am.',
        score: 0.427048,
        name: 'BATMAN',
        label: 'positive',
    }, {
        originalText: 'I wanted to see what you\'d do...and you didn\'t disappoint. You let 5 people die. Then you let Dent take your place. Even to a guy like me, that\'s cold.',
        score: -0.518097,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Where\'s Dent?',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'Those mob fools want you dead so they can get back to the way things were. But I know the truth: there\'s no going back. You\'ve changed things. Forever.',
        score: -0.515192,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Then why do you want to kill me?',
        score: -0.893941,
        name: 'BATMAN',
        label: 'negative',
    }, {
        originalText: 'Kill you? I don\'t wanna kill you. What would I do without you? Go back to ripping off mob dealers? No. No. No! No you- you complete me.',
        score: -0.58309,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'You\'re garbage who kills for money.',
        score: -0.926306,
        name: 'BATMAN',
        label: 'negative',
    }, {
        originalText: 'Don\'t talk like one of them, you\'re not. Even if you\'d like to be. To them, you\'re a freak. Like me. They just need you right now.',
        score: 0.390181,
        name: 'JOKER',
        label: 'positive',
    }, {
        originalText: 'But as soon as they don\'t they\'ll cast you out. Like a leper.',
        score: -0.606746,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Their morals, their code; it\'s a bad joke. Dropped at the first sign of trouble. They\'re only as good as the world allows them to be. You\'ll see- I\'ll show you. When the chips are down these, uh, civilized people? They\'ll eat each other. See I\'m not a monster, I\'m just ahead of the curve.',
        score: -0.501631,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Where\'s Dent?',
        score: 0,
        name: 'JOKER',
        label: 'neutral',
    }, {
        originalText: 'You have these rules, and you think they\'ll save you.',
        score: 0.521858,
        name: 'JOKER',
        label: 'positive',
    }, {
        originalText: 'I have one rule.',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'Then that\'s the one rule you\'ll have to break to know the truth.',
        score: -0.397804,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Which is?',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'The only sensible way to live in this world is without rules. And tonight you\'re gonna break your one rule.',
        score: -0.352135,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'I\'m considering it.',
        score: 0.521708,
        name: 'BATMAN',
        label: 'positive',
    }, {
        originalText: 'There are just minutes left so you\'re gonna have to play my little game if you want to save......one of them.',
        score: -0.772992,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'Them?',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'For a while I thought you really were Dent. The way you threw yourself after her...',
        score: 0,
        name: 'JOKER',
        label: 'neutral',
    }, {
        originalText: 'Look at you go! Does Harvey know about you and his little bunny?',
        score: 0.710088,
        name: 'JOKER',
        label: 'positive',
    }, {
        originalText: 'WHERE ARE THEY?',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'Killing is making a choice!',
        score: -0.856925,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'WHERE ARE THEY?',
        score: 0,
        name: 'BATMAN',
        label: 'neutral',
    }, {
        originalText: 'You choose one life over the other. Your friend, the district attorney, or his blushing bride-to-be.',
        score: 0.606829,
        name: 'JOKER',
        label: 'positive',
    }, {
        originalText: 'You have nothing! Nothing to threaten me with! Nothing to do with all your strength. But don\'t worry. I\'m going to tell you where they are. Both of them. And that\'s the point. You\'ll have to choose.',
        score: -0.360186,
        name: 'JOKER',
        label: 'negative',
    }, {
        originalText: 'He\'s at 250 52nd Street. And she\'s at Avenue X at Cicero.',
        score: 0,
        name: 'JOKER',
        label: 'neutral',
    }],
    current: null,
};
console.log('%c LineChart', 'font-size: 20px; color: #FB15B9FF;', LineChart);
const renderScore = (score) => score === 0 ? 'NEUTRAL' : score.toPrecision(3);
class App extends Component {
    state = initialState;
    handleTextInput = (e) => this.setState({ input: e.target.value })
    setCurrent = (value) => this.setState({ current: value })
    handleSubmit = (e) => {
        e.preventDefault();
        let lines;
        try {
            lines = JSON.parse(this.state.input);
        } catch (err) {
            this.setState({ error: 'Please use valid JSON.' });
        }
        console.log('%c nn', 'font-size: 20px; color: #FB15B9FF;', lines);
        Promise.all(lines.map(((line) => {
            console.log('%c sending', 'font-size: 20px; color: #FB15B9FF;', line.text);
            return analyzeSentiment(line.text).then((response) => ({
                originalText: line.text,
                name: line.name, 
                ...response.sentiment.document,
            })).catch((err) => {
                console.log('%c errr', 'font-size: 20px; color: #FB15B9FF;', err);
            });
        }))).then((data) => {
            this.setState({ data });
        });
    }
    render() {
        const { input, data, current } = this.state;
        return (
            <Fragment>
                <form className="input-submission" onSubmit={this.handleSubmit}>
                    <h1>Afterthought</h1>
                    <textarea
                        className="input"
                        onChange={this.handleTextInput}
                        value={input}
                    />
                    <button type="submit">Submit</button>
                </form>
                <div className="results-wrapper">
                    <h1>Results</h1>
                    <LineChart
                        name="results"
                        xTitle="Time"
                        yTitle="Sentiment"
                        data={data}
                        setCurrent={this.setCurrent}
                    />
                    <div className={`current line ${current && !current.old ? '' : 'hidden'}`}>
                        {current && (
                            <Fragment>
                                <span>“ {current.originalText} ”</span>
                                <div className="speaker">– {current.name}</div>
                            </Fragment>
                        )}
                    </div>
                    <div>
                        <div className={`current sentiment ${current && !current.old ? '' : 'hidden'}`}>
                            {current && renderScore(current.score)}
                        </div>
                        <span>SENTIMENT</span>
                    </div>
                    <div>
                        <div className="sentiment">
                            {renderScore(data.reduce((sum, datum) => sum += datum.score, 0) / data.length)}
                        </div>
                        <span>AVG. SENTIMENT</span>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default App;