import expect from 'expect';

import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, RECALL_STAGES, CHANGE_MODE, NAVIGATE_NEXT, NAVIGATE_PREVIOUS } from '../js/constants/AppConstants';
import * as passage from '../js/passage'

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

      it('should increment both bounds by one on next', () => {
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

      it('should decrement both bounds by one on next', () => {
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

      it('should increment both bounds by one on next', () => {
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

      it('should decrement both bounds by one on next', () => {
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

      it('should increment both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_NEXT
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(2);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });

      it('should decrement both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: NAVIGATE_PREVIOUS
        });

        expect(initialReducer.active[CHAPTER_MODE]).toEqual(0);
        expect(initialReducer.active[VERSE_MODE]).toEqual(0);
        expect(initialReducer.active[SEGMENT_MODE]).toEqual(0);
      });
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
});
