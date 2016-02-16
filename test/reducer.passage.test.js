import expect from 'expect';

import * as constants from '../js/constants/AppConstants';
import * as passage from '../js/passage'

import passageReducer from '../js/reducers/passageReducer';

describe('passageReducer', () => {
  it('should return the initial state', () => {
    const verses         = passage.verses();
    const segments       = passage.segments();
    const initialReducer = passageReducer(undefined, {});

    expect(initialReducer.active[constants.VERSE_MODE]).toEqual(0);
    expect(initialReducer.active[constants.SEGMENT_MODE]).toEqual(0);
    expect(initialReducer.active[constants.CHAPTER_MODE]).toEqual('1');
    expect(initialReducer.verses).toEqual(verses);
    expect(initialReducer.mode).toEqual(constants.SEGMENT_MODE);
    expect(initialReducer.recallStage).toEqual(constants.RECALL_STAGES.FULL);
    expect(initialReducer.isAudioPlaying).toEqual(false);
  });

  describe('navigating between content in modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            'VERSE_MODE': 5
          },
          lowerBound : 5,
          upperBound : 5,
          mode       : constants.VERSE_MODE
        };
      });

      it('should increment both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_NEXT
        });

        expect(initialReducer.lowerBound).toEqual(6);
        expect(initialReducer.upperBound).toEqual(6);
        expect(initialReducer.active[constants.VERSE_MODE]).toEqual(6);

        let secondReducer = passageReducer(initialReducer, {
          type: constants.NAVIGATE_NEXT
        });

        expect(secondReducer.lowerBound).toEqual(7);
        expect(secondReducer.upperBound).toEqual(7);
        expect(secondReducer.active[constants.VERSE_MODE]).toEqual(7);
      });

      it('should decrement both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_PREVIOUS
        });

        expect(initialReducer.lowerBound).toEqual(4);
        expect(initialReducer.upperBound).toEqual(4);
        expect(initialReducer.active[constants.VERSE_MODE]).toEqual(4);

        let secondReducer = passageReducer(initialReducer, {
          type: constants.NAVIGATE_PREVIOUS
        });

        expect(secondReducer.lowerBound).toEqual(3);
        expect(secondReducer.upperBound).toEqual(3);
        expect(secondReducer.active[constants.VERSE_MODE]).toEqual(3);
      });
    });

    describe('segment mode', () => {
      let initialState   = {},
          staticSegments = passage.staticSegments();

      beforeEach(() => {
        initialState = {
          active: {
            'SEGMENT_MODE': 5
          },
          lowerBound : staticSegments[5].lower,
          upperBound : staticSegments[5].upper,
          mode       : constants.SEGMENT_MODE
        };
      });

      it('should increment both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_NEXT
        });

        expect(initialReducer.lowerBound).toEqual(staticSegments[6].lower);
        expect(initialReducer.upperBound).toEqual(staticSegments[6].upper);
        expect(initialReducer.active[constants.SEGMENT_MODE]).toEqual(6);

        let secondReducer = passageReducer(initialReducer, {
          type: constants.NAVIGATE_NEXT
        });

        expect(secondReducer.lowerBound).toEqual(staticSegments[7].lower);
        expect(secondReducer.upperBound).toEqual(staticSegments[7].upper);
        expect(secondReducer.active[constants.SEGMENT_MODE]).toEqual(7);
      });

      it('should decrement both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_PREVIOUS
        });

        expect(initialReducer.lowerBound).toEqual(staticSegments[4].lower);
        expect(initialReducer.upperBound).toEqual(staticSegments[4].upper);
        expect(initialReducer.active[constants.SEGMENT_MODE]).toEqual(4);

        let secondReducer = passageReducer(initialReducer, {
          type: constants.NAVIGATE_PREVIOUS
        });

        expect(secondReducer.lowerBound).toEqual(staticSegments[3].lower);
        expect(secondReducer.upperBound).toEqual(staticSegments[3].upper);
        expect(secondReducer.active[constants.SEGMENT_MODE]).toEqual(3);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            'CHAPTER_MODE': '2'
          },
          lowerBound : passage.chapters()['2'].lower,
          upperBound : passage.chapters()['2'].upper,
          mode       : constants.CHAPTER_MODE
        };
      });

      it('should increment both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_NEXT
        });

        expect(initialReducer.lowerBound).toEqual(passage.chapters()['3'].lower);
        expect(initialReducer.upperBound).toEqual(passage.chapters()['3'].upper);
        expect(initialReducer.active[constants.CHAPTER_MODE].toString()).toEqual('3');
      });

      it('should decrement both bounds by one on next', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.NAVIGATE_PREVIOUS
        });

        expect(initialReducer.lowerBound).toEqual(passage.chapters()['1'].lower);
        expect(initialReducer.upperBound).toEqual(passage.chapters()['1'].upper);
        expect(initialReducer.active[constants.CHAPTER_MODE].toString()).toEqual('1');
      });
    });
  });

  describe('changing modes', () => {
    describe('verse mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            'VERSE_MODE': 0
          },
          lowerBound : 5,
          upperBound : 5
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.CHANGE_MODE,
          mode: constants.VERSE_MODE
        });

        expect(initialReducer.mode).toEqual(constants.VERSE_MODE);
      });

      it('should set the bounds based on the active element', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.CHANGE_MODE,
          mode: constants.VERSE_MODE
        });

        expect(initialReducer.lowerBound).toEqual(0);
        expect(initialReducer.upperBound).toEqual(0);
      });
    });

    describe('segment mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            'SEGMENT_MODE': 5
          },
          lowerBound : 5,
          upperBound : 5
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(undefined, {
          type: constants.CHANGE_MODE,
          mode: constants.SEGMENT_MODE
        });

        expect(initialReducer.mode).toEqual(constants.SEGMENT_MODE);
      });

      it('should set the bounds based on the active element', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.CHANGE_MODE,
          mode: constants.SEGMENT_MODE
        });

        expect(initialReducer.lowerBound).toEqual(passage.staticSegments()[5].lower);
        expect(initialReducer.upperBound).toEqual(passage.staticSegments()[5].upper);
      });
    });

    describe('chapter mode', () => {
      let initialState = {};

      beforeEach(() => {
        initialState = {
          active: {
            'CHAPTER_MODE': '1'
          },
          lowerBound : 5,
          upperBound : 5
        };
      });

      it('should handle the CHANGE_MODE action', () => {
        let initialReducer = passageReducer(undefined, {
          type: constants.CHANGE_MODE,
          mode: constants.CHAPTER_MODE
        });

        expect(initialReducer.mode).toEqual(constants.CHAPTER_MODE);
      });

      it('should set the bounds based on the active element', () => {
        let initialReducer = passageReducer(initialState, {
          type: constants.CHANGE_MODE,
          mode: constants.CHAPTER_MODE
        });

        expect(initialReducer.lowerBound).toEqual(passage.chapters()['1'].lower);
        expect(initialReducer.upperBound).toEqual(passage.chapters()['1'].upper);
      });
    });
  });
});
