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

import { NEXT_VERSE, PREVIOUS_VERSE, ENABLE_RECALL, DISABLE_RECALL, CHANGE_MODE, SEGMENT_MODE, PLAY_AUDIO, PAUSE_AUDIO, RECALL_STAGES } from '../constants/AppConstants';
import * as passage from '../passage'

// import all verse data
const verses = passage.verses();

// import the segment data
const segments = passage.segments();

// import all chapter data
const chapters = passage.chapters();

/**
 * Set the render bounds based on the current mode and the active index.
 */
function setBounds(mode, active) {
  let lower = 0,
      upper = 0;

  switch (mode) {
    case VERSE_MODE:
      lower = upper = active[VERSE_MODE]
      break;

    default:
      lower = segments[active[mode]].lower;
      upper = segments[active[mode]].upper;
      break;
  }

  return {
    lower: lower,
    upper: upper
  };
}

const initialState = assignToEmpty({
  active: {
    'VERSE_MODE'  : 0,
    'SEGMENT_MODE': 0,
    'CHAPTER_MODE': '1'
  },
  lowerBound : segments[0].lower,
  upperBound : segments[0].upper,
  verses     : verses,
  mode       : SEGMENT_MODE,
  recallStage: RECALL_STAGES.FULL
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
      let newBounds = setBounds(action.mode, state.active);

      return assignToEmpty(state, {
        lowerBound : newBounds.lower,
        upperBound : newBounds.upper,
        mode       : action.mode
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
