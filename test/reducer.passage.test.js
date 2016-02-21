import expect from 'expect';

import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, CHANGE_RECALL, RECALL_STAGES, CHANGE_MODE, NAVIGATE_NEXT, NAVIGATE_PREVIOUS, NAVIGATE_INDEX, PLAY_AUDIO, RESTORE_STATE } from '../js/constants/AppConstants';
import * as passage from '../js/passage'
import { getLastState, clearSavedTestState } from '../js/saveState'

import passageReducer from '../js/reducers/passageReducer';

describe('passageReducer', () => {
  it('should return the initial state', () => {
    const verses         = passage.verses();
    const segments       = passage.segments();
    const chapters       = passage.chapters();
    const initialReducer = passageReducer(undefined, {});

    expect(initialReducer.active[VERSE_MODE]).toEqual(0);
    expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
    expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
    expect(initialReducer.verses).toEqual(verses);
    expect(initialReducer.mode).toEqual(SEGMENT_MODE);
    expect(initialReducer.recallStage).toEqual(RECALL_STAGES.FULL);
    expect(initialReducer.isAudioPlaying).toEqual(false);
  });

  describe('navigating between content in modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 5,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should increment active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(initialReducer.active[VERSE_MODE]).toEqual(6);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);

        let secondReducer = passageReducer(initialReducer, {
          type: NAVIGATE_NEXT
        });

        expect(secondReducer.active[VERSE_MODE]).toEqual(7);
      });

      it('should decrement active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(initialReducer.active[VERSE_MODE]).toEqual(4);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);

        let secondReducer = passageReducer(initialReducer, {
          type: NAVIGATE_PREVIOUS
        });

        expect(secondReducer.active[VERSE_MODE]).toEqual(3);
      });

      it('should navigate to index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(initialReducer.active[VERSE_MODE]).toEqual(2);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(initialReducer.active[VERSE_MODE]).toEqual(5);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
      });
    });

    describe('segment mode', () => {
      let initialState   = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 5,
            CHAPTER_MODE: 0
          },
          mode: SEGMENT_MODE
        };
      });

      it('should increment active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(initialReducer.active[SEGMENT_MODE]).toEqual(6);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);

        let secondReducer = passageReducer(initialReducer, {
          type: NAVIGATE_NEXT
        });

        expect(secondReducer.active[SEGMENT_MODE]).toEqual(7);
      });

      it('should decrement active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(initialReducer.active[SEGMENT_MODE]).toEqual(4);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);

        let secondReducer = passageReducer(initialReducer, {
          type: NAVIGATE_PREVIOUS
        });

        expect(secondReducer.active[SEGMENT_MODE]).toEqual(3);
      });

      it('should navigate to index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(initialReducer.active[SEGMENT_MODE]).toEqual(2);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(initialReducer.active[SEGMENT_MODE]).toEqual(5);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 1
          },
          mode: CHAPTER_MODE
        };
      });

      it('should increment active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(2);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should decrement active by one', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should navigate to index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 2
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(2);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should ignore invalid index', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_INDEX, index: 1000
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(1);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should handle navigating below lower bounds', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });
        let secondReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      })

      it('should handle navigating above upper bounds', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });
        let secondReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(2);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      })
    });
  });

  describe('changing modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: SEGMENT_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(initialState, {
          type: CHANGE_MODE,
          mode: VERSE_MODE
        });

        expect(initialReducer.mode).toEqual(VERSE_MODE);
      });
    });

    describe('segment mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(undefined, {
          type: CHANGE_MODE,
          mode: SEGMENT_MODE
        });

        expect(initialReducer.mode).toEqual(SEGMENT_MODE);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            VERSE_MODE: 0,
            SEGMENT_MODE: 0,
            CHAPTER_MODE: 0
          },
          mode: VERSE_MODE
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(undefined, {
          type: CHANGE_MODE,
          mode: CHAPTER_MODE
        });

        expect(initialReducer.mode).toEqual(CHAPTER_MODE);
      });
    });
  });

  describe('save and restore state', () => {
    let initialState = {};

    beforeEach(() => {
      initialState = {
        active: {
          VERSE_MODE: 0,
          SEGMENT_MODE: 0,
          CHAPTER_MODE: 0
        },
        mode: VERSE_MODE,
        recallStage: RECALL_STAGES.FULL,
        isAudioPlaying: false
      };
      clearSavedTestState();
    });

    it('should restore state', () => {
      let newState = passageReducer(initialState, {
        type: RESTORE_STATE,
        state: {
          active: {
            VERSE_MODE: 7,
            SEGMENT_MODE: 6,
            CHAPTER_MODE: 3
          },
          mode: SEGMENT_MODE,
          recallStage: RECALL_STAGES.FIRST
        }
      });
      expect(newState.active.VERSE_MODE).toEqual(7);
      expect(newState.active.SEGMENT_MODE).toEqual(6);
      expect(newState.active.CHAPTER_MODE).toEqual(3);
      expect(newState.mode).toEqual(SEGMENT_MODE);
      expect(newState.recallStage).toEqual(RECALL_STAGES.FIRST);
      expect(newState.isAudioPlaying).toEqual(false);
    });

    it('should save state.active', () => {
      passageReducer(initialState, {
        type: NAVIGATE_NEXT
      });
      let lastState = getLastState();
      expect(lastState.active.VERSE_MODE).toEqual(1);
    });

    it('should save state.mode', () => {
      passageReducer(initialState, {
        type: CHANGE_MODE,
        mode: CHAPTER_MODE
      });
      let lastState = getLastState();
      expect(lastState.mode).toEqual(CHAPTER_MODE);
    });

    it('should save state.recallStage', () => {
      passageReducer(initialState, {
        type: CHANGE_RECALL,
        mode: RECALL_STAGES.FIRST
      });
      let lastState = getLastState();
      expect(lastState.recallStage).toEqual(RECALL_STAGES.FIRST);
    });

    it('should save subsequent state changes', () => {
      let state = passageReducer(initialState, {
        type: CHANGE_MODE,
        mode: SEGMENT_MODE
      });
      passageReducer(state, {
        type: NAVIGATE_NEXT
      });
      let lastState = getLastState();
      expect(lastState.mode).toEqual(SEGMENT_MODE);
      expect(lastState.active.VERSE_MODE).toEqual(0);
      expect(lastState.active.SEGMENT_MODE).toEqual(1);

    });

    it('should NOT save state.isAudioPlaying', () => {
      passageReducer(initialState, {
        type: PLAY_AUDIO
      });
      let lastState = getLastState();
      expect(lastState.isAudioPlaying).toNotExist();
    });
  });
});
