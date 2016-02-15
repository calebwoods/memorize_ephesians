import expect from 'expect';
import jsdomify from 'jsdomify';

import * as passage from '../js/passage';
import { RECALL_STAGES } from '../js/constants/AppConstants';

import Verse from '../js/components/Verse.react';

describe('Verse', () => {
  let React, TestUtils, getInstance;

  let verse = passage.verses()[0];

  before(() => {
    jsdomify.create();

    React     = require('react');
    TestUtils = require('react-addons-test-utils');

    getInstance = (props = {}) => {
      return TestUtils.renderIntoDocument(
        <Verse {...props} />
      );
    };
  });

  after(() => {
    jsdomify.destroy();
  });

  it('should render', () => {
    let element = getInstance(verse);

    expect(element).toBeTruthy();
  });

  it('should render the correct information from the provided verse in FULL recall', () => {
    verse.recallStage = RECALL_STAGES.FULL;

    let element      = getInstance(verse);
    let verseElement = TestUtils.findRenderedDOMComponentWithClass(element, 'verse-number');
    let textElement  = TestUtils.findRenderedDOMComponentWithClass(element, 'verse-text');

    // not sure why toEqual wasn't loose type checking like it should, but it wasn't
    expect(verseElement.textContent).toEqual(verse.verse.toString());
    expect(textElement.textContent).toEqual(verse.text);
  });

  it('should split the display text (leaving capitals and spacing) when in FIRST recall', () => {
    let sampleStrings = [
      'one',
      'two words',
      'three words',
      'A capital Letter'
    ];

    let expectedStrings = [
      'o  ',
      't   w    ',
      't     w    ',
      'A c       L     '
    ];

    verse.recallStage = RECALL_STAGES.FIRST;

    for (let i in sampleStrings) {
      verse.text = sampleStrings[i];

      let element     = getInstance(verse);
      let textElement = TestUtils.findRenderedDOMComponentWithClass(element, 'verse-text');

      expect(textElement.textContent).toEqual(expectedStrings[i]);
    }
  });

  it('should display no text when in NONE recall', () => {
    let sampleStrings = [
      'one',
      'two words',
      'three words',
      'A capital Letter'
    ];

    verse.recallStage = RECALL_STAGES.NONE;

    for (let i in sampleStrings) {
      verse.text = sampleStrings[i];

      let element     = getInstance(verse);
      let textElement = TestUtils.findRenderedDOMComponentWithClass(element, 'verse-text');

      expect(textElement.textContent).toBeFalsy();
    }
  });
});
