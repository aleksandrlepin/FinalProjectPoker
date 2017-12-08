import initialState from '../../../../constants/initialState';
import * as types from '../../../../constants/actionTypes';

export default function dbToStore(state = initialState.database, action) {
    let {type, payload} = action;
    switch(type) {
        case types.LOAD_DB_TO_STORE:
        console.log('i am from reducer')
	        let payloadArr = payload;
	        if(state.length >0){
		        state.map((item, index) => {
		    		if(payloadArr._id != item._id){
		    			return [...state, payloadArr]
		    		}
		    	})
		    } else {
		    	return [...state, payloadArr]
		    }
            
        default: 
            return state;
    }
};