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
import { NEXT_VERSE, PREVIOUS_VERSE, ENABLE_RECALL, ENABLE_READ, CHANGE_MODE, PLAY_AUDIO, PAUSE_AUDIO } from '../constants/AppConstants';

export function asyncNextVerse() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(nextVerse());
  };
}

export function nextVerse() {
  return { type: NEXT_VERSE };
}

export function asyncPreviousVerse() {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(previousVerse());
  };
}

export function previousVerse() {
  return { type: PREVIOUS_VERSE };
}

export function asyncEnableRecall(index) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(enableRecall(index));
  };
}

export function enableRecall(index) {
  return { type: ENABLE_RECALL, index };
}

export function asyncEnableRead(index) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(disableRecall(index));
  };
}

export function disableRecall(index) {
  return { type: ENABLE_READ, index };
}

export function asyncChangeMode(mode) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(changeMode(mode));
  };
}

export function changeMode(mode) {
  return { type: CHANGE_MODE, mode };
}

export function asyncPlayAudio(index) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(playAudio(index));
  }
}

export function playAudio(index) {
  return { type: PLAY_AUDIO, index };
}

export function asyncPauseAudio(index) {
  return (dispatch) => {
    // You can do async stuff here!
    // API fetching, Animations,...
    // For more information as to how and why you would do this, check https://github.com/gaearon/redux-thunk
    return dispatch(pauseAudio(index));
  }
}

export function pauseAudio(index) {
  return { type: PAUSE_AUDIO, index };
}
