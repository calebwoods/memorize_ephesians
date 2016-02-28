import expect from 'expect';
import { Passage, chapters } from '../js/passage'

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
const crossChapterVerses = Object.freeze([
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1 "
  },
  {
    "book": "Ephesians",
    "chapter": 2,
    "verse": 2,
    "text": "and verse 2 ends like this."
  }
]);

const crossBookVerses = Object.freeze([
  {
    "book": "Galations",
    "chapter": 6,
    "verse": 18,
    "text": "Christ be with your spirit, brothers. Amen."
  },
  {
    "book": "Ephesians",
    "chapter": 1,
    "verse": 1,
    "text": "Text, of verse 1 "
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

    it('cross chapters verses', () => {
      expect(new Passage(crossChapterVerses).metadata()).toEqual('Ephesians 1:1-2:2');
    });

    it('cross book verses', () => {
      expect(new Passage(crossBookVerses).metadata()).toEqual('Galations 6:18 - Ephesians 1:1');
    });
  });

  describe('#shortMetadata', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).shortMetadata()).toEqual('Eph 1:1');
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).shortMetadata()).toEqual('Eph 1:1-2');
    });

    it('cross chapters verses', () => {
      expect(new Passage(crossChapterVerses).shortMetadata()).toEqual('Eph 1:1-2:2');
    });

    it('cross book verses', () => {
      expect(new Passage(crossBookVerses).shortMetadata()).toEqual('Gal 6:18 - Eph 1:1');
    });
  });

  describe('#bookAndChapter', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).bookAndChapter()).toEqual('Eph 1');
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).bookAndChapter()).toEqual('Eph 1');
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

  describe('#recallFirstText', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).recallFirstText()).toEqual(
        '<sup>1</sup>T   , o  v     1 '
      );
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).recallFirstText()).toEqual(
        '<sup>1</sup>T   , o  v     1 <sup>2</sup>a   v     2 e    l    t   .'
      );
    });
  });

  describe('#recallNoneText', () => {
    it('single verse', () => {
      expect(new Passage(oneVerse).recallNoneText()).toEqual(
        '<sup>1</sup>    ,            '
      );
    });

    it('multiple verses', () => {
      expect(new Passage(twoVerses).recallNoneText()).toEqual(
        '<sup>1</sup>    ,            <sup>2</sup>                          .'
      );
    });
  });

  describe('chapters()', () => {
    it('breaks things into 3 chapters', () => {
      expect(chapters().length).toEqual(3);
      expect(chapters()[0].metadata()).toEqual('Ephesians 1:1-23');
      expect(chapters()[1].metadata()).toEqual('Ephesians 2:1-22');
      expect(chapters()[2].metadata()).toEqual('Ephesians 3:1-21');
    });
  });
});
