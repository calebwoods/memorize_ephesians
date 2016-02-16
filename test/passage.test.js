import expect from 'expect';
import { Passage } from '../js/passage'

const oneVerse = Object.freeze([
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1"
  }
]);
const twoVerses = Object.freeze([
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1"
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
});
