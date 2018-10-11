import {
  SIGN_IN_LOADING,
  SIGN_IN_FALIURE,
  SIGN_IN_SUCCESS,
  SIGN_IN_RESET_STATES
} from './types';
import { initialize, reset, change } from 'redux-form';


import { postFunction } from './api';

export function signInLoading() {
  return {
    type: SIGN_IN_LOADING
  }
}

export function signInFaliure() {
  return {
    type: SIGN_IN_FALIURE
  }
}

export function signInSuccess(data) {
  return {
    type: SIGN_IN_SUCCESS,
    data
  }
}

export function signInResetStates() {
  return {
    type: SIGN_IN_RESET_STATES
  }
}

export function resetForm(formName) {
  return (dispatch) => {
    dispatch(reset(formName));
  };
}

export function initializeForm(formName, data) {
  return (dispatch) => {
    dispatch(initialize(formName, data));
  };
}

export function initializeField(formName, data) {
  return (dispatch) => {
    dispatch(initialize(formName, data));
  };
}

export function initializeFormField(formName, data) {
  return (dispatch) => {
    dispatch(change(formName, data));
  };
}

export function signInFunction(url, body) {
  return (dispatch) => {
    dispatch(signInLoading());
    postFunction(url, body)
      .then((data) => {
        dispatch(signInSuccess(data))
      })
      .catch((err) => {
        dispatch(signInFaliure(err));
      });
  };
}