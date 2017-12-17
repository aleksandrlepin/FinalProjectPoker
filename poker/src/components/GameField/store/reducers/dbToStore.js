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
		console.log('from reducer update store')
			return [payload];
			break;

		case types.ADD_QUESTION:

			console.log("case types.ADD_QUESTION: -----------------", payload);

			// console.log("state: -----------------", state);
			// return [{ ...state[0], questions: {...questions}}];
			// return state;
			break;

		case types.CHANGE_AVERAGE:
			// console.log('reduserrrrrrrrrrrrrrrrrrrrrrrrrrr', payload);
			// console.log(state[0].answers);
			let o = payload.index;
			// console.log({ [o]: payload.average_value });
			return [{ ...state[0], answers: { ...state[0].answers, [o]: payload.average_value } }];
			break;

		case types.RESET_CARDS:
			return [{
				...state[0],
				answers: { ...state[0].answers, [payload]: 0 },
				users: state[0].users.map((user, index) => {
					console.log(user.answers[payload - 1])
					return {
						name: user.name, email: user.email, answers: user.answers.map((answer, index) => {
							if (index === payload - 1) {
								return answer = 0;
							} else return answer;
						})
					};
				}
				)
			}]

		case types.SAVE_ANSWER:
			// console.log('from save answer', payload);
			let userName = payload.user_name,
				question = payload.question_number,
				value = payload.question_value;
			return [{
				...state[0],
				users: state[0].users.map((user, index) => {
					console.log('user from map', user.name, userName)
					if (user.name === userName) {
						console.log('user from if equal', user.name, userName)
						return {
							name: user.name, email: user.email,  answers: user.answers.map((answer, index) => {
								console.log('from answer', answer, question)
								if (index === question - 1) {
									return answer = value;
								} else return answer;
							})
						}
					} else return user;
				}
				)
			}]

		case types.FLIP_CARDS:
			return state;

		default:
			return state;
	}
};