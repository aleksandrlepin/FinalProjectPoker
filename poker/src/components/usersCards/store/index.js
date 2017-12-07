import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import reducers from '../../../reducers';

const middleware = applyMiddleware(createLogger());

const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

export default store;
