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

import { NEXT_VERSE, PREVIOUS_VERSE } from '../constants/AppConstants';
import * as passage from '../passage'
import assignToEmpty from '../utils/assign';

const verses = passage.verses();
function verseByIndex(index) {
  const verse = verses[index];
  return {
    verseMetadata: verse.book + ' ' + verse.chapter + ':' + verse.verse,
    verseText: verse.text,
    verseIndex: index
  }
}
const initialState = assignToEmpty(verseByIndex(0), {
  verseCount: verses.length
});

function passageReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!
  switch (action.type) {
    case NEXT_VERSE:
      return assignToEmpty(state, verseByIndex(state.verseIndex + 1));
    case PREVIOUS_VERSE:
      return assignToEmpty(state, verseByIndex(state.verseIndex - 1));
    default:
      return state;
  }
}

export default passageReducer;
