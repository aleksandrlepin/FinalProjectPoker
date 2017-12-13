import initialState from '../../../../constants/initialState';
import * as types from '../../../../constants/actionTypes';

export default function dbToStore(state = initialState.database, action) {
	let { type, payload } = action;
	switch (type) {
		case types.LOAD_DB_TO_STORE:
			let payloadArr = payload;
			if (state.length > 0) {
				state.map((item, index) => {
					// if(payloadArr._id != item._id){
					return [...state, payloadArr]

					// }
				})
			} else {
				return [...state, payloadArr]
			}
			break;

		case types.ADD_PLAYER:
			return [{ ...state[0], users: [...payload.users] }];
			break;

		case types.UPDATE_STORE:
			return [payload];
			break;
		
		case types.CHANGE_AVERAGE:
			console.log('reduserrrrrrrrrrrrrrrrrrrrrrrrrrr',payload)
			console.log(state[0].answers)
			let o = payload.index
			console.log({[o]:payload.average_value})
			return [{ ...state[0], answers: {...state[0].answers,[o]:payload.average_value}}];
			break;

		default:
			console.log('default');
			return state;
	}
};