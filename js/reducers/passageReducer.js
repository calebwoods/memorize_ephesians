/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the passageReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 *
 * To add a new reducer, add a file like this to the reducers folder, and
 * add it in the rootReducer.js.
 */
import assignToEmpty from '../utils/assign';

import { NEXT_VERSE, PREVIOUS_VERSE, ENABLE_RECALL, ENABLE_READ, CHANGE_MODE, MULTI_MODE, PLAY_AUDIO, PAUSE_AUDIO, VERSE_STATES } from '../constants/AppConstants';
import * as passage from '../passage'

const verses = passage.verses().map(function (verse, index) {
  verse.verseState = VERSE_STATES.READ;
  verse.verseIndex = index;
  return verse;
});

const initialState = assignToEmpty({
  activeVerse: 0,
  totalVerses: verses.length,
  verses     : verses,
  mode       : MULTI_MODE
});

function passageReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!

  switch (action.type) {
    case NEXT_VERSE:
      return assignToEmpty(state, {
        activeVerse: state.activeVerse + 1
      });
    case PREVIOUS_VERSE:
      return assignToEmpty(state, {
        activeVerse: state.activeVerse - 1
      });
    case ENABLE_RECALL:
      return assignToEmpty(state, {
        verses: [
          ...state.verses.slice(0, action.index),
          Object.assign({}, state.verses[action.index], {
            verseState: VERSE_STATES.RECALL
          }),
          ...state.verses.slice(action.index + 1)
        ]
      });
    case ENABLE_READ:
      return assignToEmpty(state, {
        verses: [
          ...state.verses.slice(0, action.index),
          Object.assign({}, state.verses[action.index], {
            verseState: VERSE_STATES.READ
          }),
          ...state.verses.slice(action.index + 1)
        ]
      });
    case CHANGE_MODE:
      return assignToEmpty(state, {
        mode : action.mode
      });
    case PLAY_AUDIO:
      return assignToEmpty(state, {
        verses: [
          ...state.verses.slice(0, action.index),
          Object.assign({}, state.verses[action.index], {
            isAudioPlaying: true
          }),
          ...state.verses.slice(action.index + 1)
        ]
      });
    case PAUSE_AUDIO:
      return assignToEmpty(state, {
        verses: [
          ...state.verses.slice(0, action.index),
          Object.assign({}, state.verses[action.index], {
            isAudioPlaying: false
          }),
          ...state.verses.slice(action.index + 1)
        ]
      });
    default:
      return state;
  }
}

export default passageReducer;
