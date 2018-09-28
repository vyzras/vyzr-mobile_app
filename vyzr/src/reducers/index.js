import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import SignInReducer from './SignInReducer';
import GetOverviewReducer from './GetOverviewReducer';
import CreateFeedbackReducer from './CreateFeedbackReducer';

export default function getRootReducer() {
  return combineReducers({
    form: formReducer,

    SignInStates: SignInReducer,

    GetOverviewStates: GetOverviewReducer,

    CreateFeedbackStates: CreateFeedbackReducer
  })
}