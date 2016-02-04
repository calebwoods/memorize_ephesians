import expect from 'expect';
import verseByIndex from '../js/reducers/passageReducer';
import passageReducer from '../js/reducers/passageReducer';
import * as constants from '../js/constants/AppConstants';
import * as passage from '../js/passage'

describe('defaultReducer', () => {
  it('should return the initial state', () => {
    const verse = passage.verses()[0];
    expect(passageReducer(undefined, {})).toEqual({
      verseMetadata: verse.book + ' ' + verse.chapter + ':' + verse.verse,
      verseText: verse.text,
      verseIndex: 0,
      verseCount: passage.verses().length,
      isRecalling: false
    });
  });

  it('should handle the NEXT_VERSE action', () => {
    const nextVerse = passage.verses()[1];
    expect(
      passageReducer(undefined, {
        type: constants.NEXT_VERSE
      })
    ).toEqual({
      verseMetadata: nextVerse.book + ' ' + nextVerse.chapter + ':' + nextVerse.verse,
      verseText: nextVerse.text,
      verseIndex: 1,
      verseCount: passage.verses().length,
      isRecalling: false
    });
  });

  // Test that it handles changing the project name correctly
  it('should handle the PREVIOUS_VERSE action', () => {
    const newVerse = passage.verses()[0];
    const firstState = passageReducer(undefined, {
      type: constants.NEXT_VERSE
    })
    expect(
      passageReducer(firstState, {
        type: constants.PREVIOUS_VERSE
      })
    ).toEqual({
      verseMetadata: newVerse.book + ' ' + newVerse.chapter + ':' + newVerse.verse,
      verseText: newVerse.text,
      verseIndex: 0,
      verseCount: passage.verses().length,
      isRecalling: false
    });
  });

  describe('recall mode', () => {
    it('should set isRecalling to true', () => {
      const newReducerState = passageReducer(undefined, {
        type: constants.ENABLE_RECALL
      })

      expect(newReducerState.isRecalling).toBeTruthy();
    });

    it('should only render the first letter of every word, and maintain word character limit', () => {
      const sampleStrings = [
        'one',
        'two words',
        'three words',
        'A capital Letter'
      ];

      const expectedStrings = [
        'o  ',
        't   w    ',
        't     w    ',
        'A c       L     '
      ];

      for (let i in sampleStrings) {
        let newReducerState = passageReducer({ verseText: sampleStrings[i] }, {
          type: constants.ENABLE_RECALL
        })

        expect(newReducerState.verseText).toEqual(expectedStrings[i]);
      }
    });

    it('should not change verse text once in recall mode', () => {
      const verse = {
        verseText: 'Sample text'
      };

      passageReducer(verse, {
        type: constants.ENABLE_RECALL
      })

      const newReducerState = passageReducer(verse, {
        type: constants.ENABLE_RECALL
      })

      expect(newReducerState.verseText).toNotEqual(verse.verseText);
    });

    it('should revert to verse text when leaving recall mode', () => {
      const verse = passage.verses()[0];

      const initialReducerState = passageReducer(undefined, {
        type: constants.ENABLE_RECALL
      })

      const newReducerState = passageReducer(undefined, {
        type: constants.DISABLE_RECALL
      })


      expect(initialReducerState.verseText).toNotEqual(newReducerState.verseText);
      expect(newReducerState.verseText).toEqual(verse.text);
    });
  });
});
