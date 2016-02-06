import expect from 'expect';
import jsdomify from 'jsdomify';

import Verse from '../js/components/Verse.react';
import * as passage from '../js/passage';

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

  it('should render the correct information from the provided verse', () => {
    let element     = getInstance(verse);
    let metaElement = TestUtils.findRenderedDOMComponentWithClass(element, 'passage-metadata');
    let textElement = TestUtils.findRenderedDOMComponentWithClass(element, 'passage-text');

    expect(metaElement.textContent).toEqual(verse.book + ' ' + verse.chapter + ':' + verse.verse);
    expect(textElement.textContent).toEqual(verse.text);
  });

  it('should split the display text (leaving capitals and spacing) when in recall mode', () => {
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

    verse.isRecalling = true;

    for (let i in sampleStrings) {
      verse.text = sampleStrings[i];

      let element     = getInstance(verse);
      let textElement = TestUtils.findRenderedDOMComponentWithClass(element, 'passage-text');

      expect(textElement.textContent).toEqual(expectedStrings[i]);
    }
  });
});
