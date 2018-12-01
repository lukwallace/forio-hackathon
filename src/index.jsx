import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';

function getContainer(Component) {
    return (
        <AppContainer>
            <Component />
        </AppContainer>
    );
}

render(getContainer(App), document.querySelector('#app'));

if (module.hot) {
    module.hot.accept('./app', () => {
        const App = require('./app').default;
        render(getContainer(App), document.querySelector('#app'));
    });
}
