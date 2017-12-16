import initialState from '../../../../constants/initialState';
import * as types from '../../../../constants/actionTypes';

export default function dbToStore(state = initialState.database, action) {
	let { type, payload } = action;
	switch (type) {
		case types.LOAD_DB_TO_STORE:
			if (state.length > 0) {
				state.map((item, index) => {
					console.log('from dbtostore if')
					return [...state, payload]

					// }
				})
			} else {
				console.log('from dbtostore else')
				return [...state, payload]
			}
			break;

		case types.ADD_PLAYER:
			return [{ ...state[0], users: [...payload.users] }];
			break;

		case types.UPDATE_STORE:
			return [payload];
			break;

		case types.ADD_QUESTION:

			console.log("case types.ADD_QUESTION: -----------------", payload);

			// console.log("state: -----------------", state);
			// return [{ ...state[0], questions: {...questions}}];
			// return state;
			break;
		
		case types.CHANGE_AVERAGE:
			console.log('reduserrrrrrrrrrrrrrrrrrrrrrrrrrr',payload);
			console.log(state[0].answers);
			let o = payload.index;
			console.log({[o]:payload.average_value});
			return [{ ...state[0], answers: {...state[0].answers,[o]:payload.average_value}}];
			break;

		default:
			return state;
	}
};