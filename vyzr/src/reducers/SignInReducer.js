import {
	SIGN_IN_LOADING,
	SIGN_IN_FALIURE,
	SIGN_IN_SUCCESS,
	SIGN_IN_RESET_STATES
} from '../actions/types';

const initialState = {
	response: null,
	loading: false,
	success: false,
	faliure: false,
}

export default function signInReducer(state = initialState, action) {
	switch (action.type) {
		case SIGN_IN_LOADING:
			return Object.assign({}, state, {
				response: null,
				loading: true
			});
		case SIGN_IN_SUCCESS:
			return Object.assign({}, state, {
				loading: false,
				response: action.data
			});
		case SIGN_IN_FALIURE:
			return Object.assign({}, state, {
				loading: false,
				faliure: true
			});
		case SIGN_IN_RESET_STATES:
			return Object.assign({}, state, initialState);
		default:
			return state
	}
}