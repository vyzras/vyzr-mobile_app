import {
  GET_OVERVIEW_LOADING,
  GET_OVERVIEW_FALIURE,
  GET_OVERVIEW_SUCCESS,
  GET_OVERVIEW_RESET_STATES
} from './types';

import { getFunctionWithAuthToken } from './api';

export function getOverviewLoading() {
  return {
      type: GET_OVERVIEW_LOADING
  }
}

export function getOverviewFaliure() {
  return {
      type: GET_OVERVIEW_FALIURE
  }
}

export function getOverviewSuccess(data) {
  return {
      type: GET_OVERVIEW_SUCCESS,
      data
  }
}

export function getOverviewResetStates() {
  return {
      type: GET_OVERVIEW_RESET_STATES
  }
}

export function getOverviewFunction(url, token) {
  return (dispatch) => {
    dispatch(getOverviewLoading());
    getFunctionWithAuthToken(url, token)
      .then((data) => {
        dispatch(getOverviewSuccess(data))
      })
      .catch((err) => {
        dispatch(getOverviewFaliure(err));
      });
  };
}
