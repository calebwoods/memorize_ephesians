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

const initialState = assignToEmpty({
  active: {
    VERSE_MODE  : 0,
    SEGMENT_MODE: 0,
    CHAPTER_MODE: 0
  },
  verses        : verses,
  segments      : segments,
  chapters      : chapters,
  mode          : SEGMENT_MODE,
  recallStage   : RECALL_STAGES.FULL,
  isAudioPlaying: false
});

function passageReducer(state = initialState, action) {
  Object.freeze(state); // Don't mutate state directly, always use assign()!

  let newActive = {};
  let activeCollection = [];

  switch (action.type) {
    case NAVIGATE_NEXT:
      newActive = state.active;
      if (state.mode === VERSE_MODE) {
        activeCollection = verses;
      } else if (state.mode === SEGMENT_MODE) {
        activeCollection = segments;
      } else {
        activeCollection = chapters;
      }
      if (newActive[state.mode] < activeCollection.length - 1) {
        newActive[state.mode]++;
      }

      return assignToEmpty(state, {
        active: newActive
      });

    case NAVIGATE_PREVIOUS:
      newActive = state.active;
      if (newActive[state.mode] > 0) {
        newActive[state.mode]--;
      }

      return assignToEmpty(state, {
        active: newActive
      });

    case CHANGE_RECALL:
      return assignToEmpty(state, {
        recallStage: action.mode
      });

    case CHANGE_MODE:
      return assignToEmpty(state, {
        mode: action.mode
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
