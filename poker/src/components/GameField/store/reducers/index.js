import {combineReducers} from 'redux';

import dbToStore from './dbToStore';
import authUser from './authUser';

const reducers = combineReducers({
    dbToStore,
    authUser
});

export default reducers;