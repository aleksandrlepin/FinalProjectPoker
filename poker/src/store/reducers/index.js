import {combineReducers} from 'redux';

import dbToStore from './dbToStore';
import userPic from './userPic';
console.log('userPic: ', userPic);


const reducers = combineReducers({
    userPic,
    dbToStore,
});

export default reducers;
