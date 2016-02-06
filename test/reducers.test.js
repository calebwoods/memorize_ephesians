import expect from 'expect';
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
      isAudioPlaying: false
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
      isAudioPlaying: false
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
      isAudioPlaying: false
    });
  });

  it('should handle the PLAY_AUDIO action', () => {
    const verse = passage.verses()[0];
    expect(
      passageReducer(undefined, {
        type: constants.PLAY_AUDIO
      })
    ).toEqual({
      verseMetadata: verse.book + ' ' + verse.chapter + ':' + verse.verse,
      verseText: verse.text,
      verseIndex: 0,
      verseCount: passage.verses().length,
      isAudioPlaying: true
    });
  });

  it('should handle the PAUSE_AUDIO action', () => {
    const verse = passage.verses()[0];
    expect(
      passageReducer(
        passageReducer(undefined, { type: constants.PLAY_AUDIO }),
        { type: constants.PAUSE_AUDIO }
      )
    ).toEqual({
      verseMetadata: verse.book + ' ' + verse.chapter + ':' + verse.verse,
      verseText: verse.text,
      verseIndex: 0,
      verseCount: passage.verses().length,
      isAudioPlaying: false
    });
  });
});
