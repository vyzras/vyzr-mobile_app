import {
  GET_OVERVIEW_LOADING,
  GET_OVERVIEW_FALIURE,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_RESET_STATES
} from '../actions/types';

const initialState = {
  response: null,
  loading: false,
  success: false,
  faliure: false,
}

export default function getOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OVERVIEW_LOADING:
      return Object.assign({}, state, {
        response: null,
        loading: true
      });
    case GET_OVERVIEW_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        response: action.data
      });
    case GET_OVERVIEW_FALIURE:
      return Object.assign({}, state, {
        loading: false,
        faliure: true
      });
    case GET_OVERVIEW_RESET_STATES:
      return Object.assign({}, state, initialState);
    default:
      return state
  }
}