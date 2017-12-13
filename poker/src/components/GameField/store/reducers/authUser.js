
import * as types from '../../../../constants/actionTypes';

export default function authUser(state = null, action) {
    let { type, payload } = action;
    switch (type) {
        case types.USER_AUTHORIZATION:
            console.log(state)
            return { ...state, ...payload }
            console.log(state)
            break;


        default:
            console.log('default USER   ', state);
            return state;
    }
};