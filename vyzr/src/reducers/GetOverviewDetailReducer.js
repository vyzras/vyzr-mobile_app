import {
  GET_OVERVIEW_DETAIL_LOADING,
  GET_OVERVIEW_DETAIL_FALIURE,
  GET_OVERVIEW_DETAIL_SUCCESS,
  GET_OVERVIEW_DETAIL_RESET_STATES
} from '../actions/types';

const initialState = {
  response: null,
  loading: false,
  success: false,
  faliure: false,
}

export default function getOverviewReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OVERVIEW_DETAIL_LOADING:
      return Object.assign({}, state, {
        response: null,
        loading: true
      });
    case GET_OVERVIEW_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        response: action.data
      });
    case GET_OVERVIEW_DETAIL_FALIURE:
      return Object.assign({}, state, {
        loading: false,
        faliure: true
      });
    case GET_OVERVIEW_DETAIL_RESET_STATES:
      return Object.assign({}, state, initialState);
    default:
      return state
  }
}