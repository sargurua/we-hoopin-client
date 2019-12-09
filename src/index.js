import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers'
import App from './App';
import * as serviceWorker from './serviceWorker';
import {composeWithDevTools} from 'redux-devtools-extension'
import 'bootstrap/dist/css/bootstrap.min.css';

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(rootReducer, composeEnhancers)

ReactDOM.render(
    <Provider store={store}>
            <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
