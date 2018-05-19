import initialState from '../../constants/initialState';
import * as types from '../../constants/actionTypes';

function getUserpic(state = "", action) {
	let { type, payload } = action;
	switch (type) {
		case types.GET_USERPIC:
			return payload;
		default:
			return state;
	}
};

export default getUserpic;
