import {
  CREATE_FEEDBACK_LOADING,
  CREATE_FEEDBACK_FALIURE,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_RESET_STATES
} from '../actions/types';

const initialState = {
  response: null,
  loading: false,
  success: false,
  faliure: false,
}

export default function createFeedbackReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_FEEDBACK_LOADING:
      return Object.assign({}, state, {
        response: null,
        loading: true
      });
    case CREATE_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        response: action.data
      });
    case CREATE_FEEDBACK_FALIURE:
      return Object.assign({}, state, {
        loading: false,
        faliure: true
      });

    case CREATE_FEEDBACK_RESET_STATES:
      return Object.assign({}, state, initialState);
    default:
      return state
  }
}