import expect from 'expect';
import passageReducer from '../js/reducers/passageReducer';
import * as constants from '../js/constants/AppConstants';
import * as passage from '../js/passage'

describe('passageReducer', () => {
  it('should return the initial state', () => {
    const verses = passage.verses();

    const initialReducer = passageReducer(undefined, {});

    expect(initialReducer.activeVerse).toEqual(0);
    expect(initialReducer.totalVerses).toEqual(verses.length);
    expect(initialReducer.verses).toEqual(verses);
    expect(initialReducer.mode).toEqual('multi');
  });

  it('should handle the NEXT_VERSE action', () => {
    const initialReducer = passageReducer(undefined, {
      type: constants.NEXT_VERSE
    });

    expect(initialReducer.activeVerse).toEqual(1);

    const secondReducer = passageReducer(initialReducer, {
      type: constants.NEXT_VERSE
    });

    expect(secondReducer.activeVerse).toEqual(2);
  });

  // Test that it handles changing the project name correctly
  it('should handle the PREVIOUS_VERSE action', () => {
    const initialState = {
      activeVerse: 6
    };

    const initialReducer = passageReducer(initialState, {
      type: constants.PREVIOUS_VERSE
    });

    expect(initialReducer.activeVerse).toEqual(5);

    const secondReducer = passageReducer(initialReducer, {
      type: constants.PREVIOUS_VERSE
    });

    expect(secondReducer.activeVerse).toEqual(4);
  });

  describe('enabling recall', () => {
    it('should be able to set isRecalling for individual verses', () => {
      const initialState = {
        verses: [
          {
            text: 'First'
          }, {
            text: 'Second'
          }
        ]
      };

      const initialReducer = passageReducer(initialState, {
        type: constants.ENABLE_RECALL,
        index: 1
      });

      expect(initialReducer.verses[0].isRecalling).toBeFalsy();
      expect(initialReducer.verses[1].isRecalling).toBeTruthy();
    });

    it('should be able to set isRecalling for all verses at once', () => {

    });
  });

  it('should handle the CHANGE_MODE action', () => {
    const initialReducer = passageReducer(undefined, {
      type: constants.CHANGE_MODE,
      mode: constants.MULTI_MODE
    });

    expect(initialReducer.mode).toEqual(constants.MULTI_MODE);
  });
});
