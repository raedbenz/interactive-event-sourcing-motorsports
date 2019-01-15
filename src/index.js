import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './index.css';

// Bootstrap setup
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';

// Redux setup
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleWare = applyMiddleware(thunk);
const store = createStore(rootReducer, middleWare);

const Root = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

ReactDOM.render(<Root />, document.getElementById('root'));