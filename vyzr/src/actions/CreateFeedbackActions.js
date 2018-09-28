import {
  CREATE_FEEDBACK_LOADING,
  CREATE_FEEDBACK_FALIURE,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_RESET_STATES
} from './types';

import { postFunctionWithAuthToken } from './api';


export function createFeedbackLoading() {
  return {
    type: CREATE_FEEDBACK_LOADING
  }
}

export function createFeedbackFaliure() {
  return {
    type: CREATE_FEEDBACK_FALIURE
  }
}

export function createFeedbackSuccess(data) {
  return {
    type: CREATE_FEEDBACK_SUCCESS,
    data
  }
}

export function createFeedbackResetStates() {
  return {
    type: CREATE_FEEDBACK_RESET_STATES
  }
}

export function createFeedbackFunction(url, body, authToken) {
  return (dispatch) => {
    dispatch(createFeedbackLoading());
    postFunctionWithAuthToken(url, body, authToken)
      .then((data) => {
        dispatch(createFeedbackSuccess(data));
      })
      .catch((err) => {
        dispatch(createFeedbackFaliure(err));
      });
  };
}
