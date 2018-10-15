import {
  GET_OVERVIEW_DETAIL_LOADING,
  GET_OVERVIEW_DETAIL_FALIURE,
  GET_OVERVIEW_DETAIL_SUCCESS,
  GET_OVERVIEW_DETAIL_RESET_STATES
} from './types';

import { getFunctionWithAuthToken } from './api';

export function getOverviewDetailLoading() {
  return {
      type: GET_OVERVIEW_DETAIL_LOADING
  }
}

export function getOverviewDetailFaliure() {
  return {
      type: GET_OVERVIEW_DETAIL_FALIURE
  }
}

export function getOverviewDetailSuccess(data) {
  return {
      type: GET_OVERVIEW_DETAIL_SUCCESS,
      data
  }
}

export function getOverviewDetailResetStates() {
  return {
      type: GET_OVERVIEW_DETAIL_RESET_STATES
  }
}

export function getOverviewDetailFunction(url, token) {
  return (dispatch) => {
    dispatch(getOverviewDetailLoading());
    getFunctionWithAuthToken(url, token)
      .then((data) => {
        dispatch(getOverviewDetailSuccess(data))
      })
      .catch((err) => {
        dispatch(getOverviewDetailFaliure(err));
      });
  };
}
