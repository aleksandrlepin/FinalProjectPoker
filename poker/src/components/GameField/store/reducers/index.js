import {combineReducers} from 'redux';

import dbToStore from './dbToStore';

const reducers = combineReducers({
    dbToStore,
});

export default reducers;