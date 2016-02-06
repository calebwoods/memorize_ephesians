import expect from 'expect';
import jsdomify from 'jsdomify';

import { MODES, SINGLE_MODE, MULTI_MODE } from '../js/constants/AppConstants';
import { PassagePage } from '../js/components/pages/PassagePage.react';
import * as passage from '../js/passage';

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
    it('should assign the correct button text based on mode', () => {
      let element     = getInstance({ mode: SINGLE_MODE });
      let modeElement = TestUtils.findRenderedDOMComponentWithClass(element, 'scripture-mode');

      expect(modeElement.textContent).toEqual(MODES[MULTI_MODE]);

      element     = getInstance({ mode: MULTI_MODE });
      modeElement = TestUtils.findRenderedDOMComponentWithClass(element, 'scripture-mode');

      expect(modeElement.textContent).toEqual(MODES[SINGLE_MODE]);
    });
  })
});
