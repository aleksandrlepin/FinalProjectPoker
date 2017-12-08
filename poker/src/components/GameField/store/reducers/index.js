import {combineReducers} from 'redux';

import dbToStore from './dbToStore';
import increment from './increment';

const reducers = combineReducers({
    dbToStore,
    increment
});

export default reducers;