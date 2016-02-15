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

import { NAVIGATE_NEXT, NAVIGATE_PREVIOUS, CHANGE_RECALL, PLAY_AUDIO, PAUSE_AUDIO, RECALL_STAGES } from '../constants/AppConstants';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, CHANGE_MODE } from '../constants/AppConstants';
import * as passage from '../passage'

// import all verse data
const verses = passage.verses();

// import the segment data
const segments = passage.segments();

// import all chapter data
const chapters = passage.chapters();

/**
 * Set the render bounds based on the current mode and the active index.
 * This will also need smarts to set the bounds when navigating between modes.
 */
function setBounds(mode, active) {
  let lower = 0,
      upper = 0;

  switch (mode) {
    case VERSE_MODE:
      lower = upper = active[VERSE_MODE]
      break;

    case SEGMENT_MODE:
      lower = segments[active[mode]].lower;
      upper = segments[active[mode]].upper;
      break;

    case CHAPTER_MODE:
      lower = chapters[active[mode]].lower;
      upper = chapters[active[mode]].upper;
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
  lowerBound    : segments[0].lower,
  upperBound    : segments[0].upper,
  verses        : verses,
  mode          : SEGMENT_MODE,
  recallStage   : RECALL_STAGES.FULL,
  isAudioPlaying: false
});

function passageReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!

  let newActive = {},
      newLower,
      newUpper;

  switch (action.type) {
    case NAVIGATE_NEXT:
      newLower = state.lowerBound + 1;
      newUpper = state.upperBound + 1;

      newActive = state.active;
      newActive[state.mode]++;

      return assignToEmpty(state, {
        lowerBound : newLower,
        upperBound : newUpper,
        active     : newActive
      });

    case NAVIGATE_PREVIOUS:
      newLower = state.lowerBound - 1;
      newUpper = state.upperBound - 1;

      newActive = state.active;
      newActive[state.mode]--;

      return assignToEmpty(state, {
        lowerBound : newLower,
        upperBound : newUpper,
        active     : newActive
      });

    case CHANGE_RECALL:
      return assignToEmpty(state, {
        recallStage: action.mode
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
        isAudioPlaying: true
      });

    case PAUSE_AUDIO:
      return assignToEmpty(state, {
        isAudioPlaying: false
      });

    default:
      return state;
  }
}

export default passageReducer;
