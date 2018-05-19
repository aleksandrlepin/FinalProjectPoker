import initialState from '../../constants/initialState';
import * as types from '../../constants/actionTypes';

export default function dbToStore(state = initialState.database, action) {
	let { type, payload } = action;
	switch (type) {
		case types.LOAD_DB_TO_STORE:
			return [payload];

		case types.ADD_PLAYER:
			return [{ ...state[0], users: [...payload.users] }];

		case types.UPDATE_STORE:
			return [payload];


		case types.ADD_QUESTION:
			let count = 1;
			for(let key in state[0].questions){
				count++;
			}

			console.log(state[0].questions);
			return [{ ...state[0], questions:{ ...state[0].questions, [count]:payload}}];

		case types.CHANGE_AVERAGE:
			let o = payload.index;
			return [{ ...state[0], answers: { ...state[0].answers, [o]: payload.average_value } }];


		case types.RESET_CARDS:
			return [{
				...state[0],
				answers: { ...state[0].answers, [payload]: 0 },
				users: state[0].users.map((user, index) => {
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
			let userName = payload.user_name,
				question = payload.question_number,
				value = payload.question_value;
			return [{
				...state[0],
				users: state[0].users.map((user, index) => {
					if (user.name === userName) {
						return {
							name: user.name, email: user.email, answers: user.answers.map((answer, index) => {
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
