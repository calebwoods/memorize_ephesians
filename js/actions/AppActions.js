/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return (dispatch) => {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        };
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

// Disable the no-use-before-define eslint rule for this file
// It makes more sense to have the asnyc actions before the non-async ones
/* eslint-disable no-use-before-define */
import { NAVIGATE_NEXT, NAVIGATE_PREVIOUS, CHANGE_MODE, CHANGE_RECALL, PLAY_AUDIO, PAUSE_AUDIO, RESTORE_STATE } from '../constants/AppConstants';

export function asyncNavigateNext() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(navigateNext());
  };
}

export function navigateNext() {
  return { type: NAVIGATE_NEXT };
}

export function asyncNavigatePrevious() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(navigatePrevious());
  };
}

export function navigatePrevious() {
  return { type: NAVIGATE_PREVIOUS };
}

export function asyncChangeMode(mode) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeMode(mode));
  }
}

export function changeMode(mode) {
  return { type: CHANGE_MODE, mode };
}

export function asyncChangeRecall(mode) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeRecall(mode));
  }
}

export function changeRecall(mode) {
  return { type: CHANGE_RECALL, mode };
}

export function asyncPlayAudio() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(playAudio());
  }
}

export function playAudio() {
  return { type: PLAY_AUDIO };
}

export function asyncPauseAudio() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(pauseAudio());
  }
}

export function pauseAudio() {
  return { type: PAUSE_AUDIO };
}

export function asyncRestoreState(state) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(restoreState(state));
  }
}

export function restoreState(state) {
  return { type: RESTORE_STATE, state };
}
