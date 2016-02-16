import expect from 'expect';
import { Passage } from '../js/passage'

const oneVerse = Object.freeze([
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1 "
  }
]);
const twoVerses = Object.freeze([
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1 "
  },
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 2,
    "text": "and verse 2 ends like this."
  }
]);

describe('Passage', () => {
  describe('#metadata', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).metadata()).toEqual('Ephesians 1:1');
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).metadata()).toEqual('Ephesians 1:1-2');
    });
  });

  describe('#audoUrl', () => {
    const baseAudioUrl = (new Passage).baseAudioUrl();
    it('single verse', () => {
      expect(new Passage(oneVerse).audioUrl()).toEqual(baseAudioUrl + 'Ephesians%201:1' + '&output-format=mp3');
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).audioUrl()).toEqual(baseAudioUrl + 'Ephesians%201:1-2' + '&output-format=mp3');
    });
  });

  describe('#readText', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).readText()).toEqual('<sup>1</sup>Text, of verse 1 ');
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).readText()).toEqual('<sup>1</sup>Text, of verse 1 <sup>2</sup>and verse 2 ends like this.');
    });
  });
});
