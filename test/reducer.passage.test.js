import expect from 'expect';

import * as constants from '../js/constants/AppConstants';
import * as passage from '../js/passage'

import passageReducer from '../js/reducers/passageReducer';
import { VERSE_STATES } from '../js/constants/AppConstants';

describe('passageReducer', () => {
  it('should return the initial state', () => {
    const verses = passage.verses();

    const initialReducer = passageReducer(undefined, {});

    expect(initialReducer.activeVerse).toEqual(0);
    expect(initialReducer.totalVerses).toEqual(verses.length);
    expect(initialReducer.verses).toEqual(verses);
    expect(initialReducer.mode).toEqual(constants.MULTI_MODE);
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

  describe('enabling READ', () => {
    it('should be able to set verseState for individual verses', () => {
      const initialState = {
        verses: [
          {
            text: 'First',
            verseState: VERSE_STATES.RECALL
          }, {
            text: 'Second',
            verseState: VERSE_STATES.RECALL
          }
        ]
      };

      const initialReducer = passageReducer(initialState, {
        type: constants.ENABLE_READ,
        index: 1
      });

      expect(initialReducer.verses[0].verseState).toEqual(VERSE_STATES.RECALL);
      expect(initialReducer.verses[1].verseState).toEqual(VERSE_STATES.READ);
    });
  });

  describe('enabling RECALL', () => {
    it('should be able to set verseState for individual verses', () => {
      const initialState = {
        verses: [
          {
            text: 'First',
            verseState: VERSE_STATES.READ
          }, {
            text: 'Second',
            verseState: VERSE_STATES.READ
          }
        ]
      };

      const initialReducer = passageReducer(initialState, {
        type: constants.ENABLE_RECALL,
        index: 1
      });

      expect(initialReducer.verses[0].verseState).toEqual(VERSE_STATES.READ);
      expect(initialReducer.verses[1].verseState).toEqual(VERSE_STATES.RECALL);
    });
  });

  describe('enabling LISTEN', () => {
    it('should be able to set isAudioPlaying for individual verses', () => {
      const initialState = {
        verses: [
          {
            text: 'First',
            verseState: VERSE_STATES.READ
          }, {
            text: 'Second',
            verseState: VERSE_STATES.READ
          }
        ]
      };

      const initialReducer = passageReducer(initialState, {
        type: constants.PLAY_AUDIO,
        index: 1
      });

      expect(initialReducer.verses[0].isAudioPlaying).toBeFalsy();
      expect(initialReducer.verses[1].verseState).toBeTruthy();
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
