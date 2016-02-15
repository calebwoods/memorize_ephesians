import expect from 'expect';
import jsdomify from 'jsdomify';

import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE } from '../js/constants/AppConstants';
import * as passage from '../js/passage';

import { PassagePage } from '../js/components/pages/PassagePage.react';

describe('PassagePage', () => {
  let React, TestUtils, getInstance;

  before(() => {
    jsdomify.create();

    React     = require('react');
    TestUtils = require('react-addons-test-utils');

    getInstance = (props = {}) => {
      return TestUtils.renderIntoDocument(
        <PassagePage data={ props } dispatch={ {} } />
      );
    };
  });

  after(() => {
    jsdomify.destroy();
  });

  it('should render', () => {
    let element = getInstance();

    expect(element).toBeTruthy();
  });

  describe('changing modes', function() {
    let verses = passage.verses(),
        props  = {
          active: {
            'VERSE_MODE'  : 0,
            'SEGMENT_MODE': 0,
            'CHAPTER_MODE': '1'
          },
          verses: verses
        };

    after(() => {
      props.mode = null
    });

    it('should render the active verse in single mode', () => {
      props.mode       = VERSE_MODE;
      props.lowerBound = 0;
      props.upperBound = 0;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-number');

      expect(renderedVerses.length).toEqual(1);
    });

    it('should render all verses for a segment in segment mode', () => {
      let segments = passage.segments();

      props.mode       = SEGMENT_MODE;
      props.lowerBound = segments[props.active[props.mode]].lower;
      props.upperBound = segments[props.active[props.mode]].upper;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-number');

      expect(renderedVerses.length).toEqual(props.upperBound - props.lowerBound + 1);
    });

    it('should render all verses for a chapter in chapter mode', () => {
      let chapters = passage.chapters();

      props.mode       = CHAPTER_MODE;
      props.lowerBound = chapters[props.active[props.mode]].lower;
      props.upperBound = chapters[props.active[props.mode]].upper;

      let element        = getInstance(props);
      let renderedVerses = TestUtils.scryRenderedDOMComponentsWithClass(element, 'verse-number');

      expect(renderedVerses.length).toEqual(props.upperBound - props.lowerBound + 1);
    });
  })
});
