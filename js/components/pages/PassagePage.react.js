/*
 * PassagePage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { asyncNextVerse, asyncPreviousVerse, asyncChangeMode } from '../../actions/AppActions';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE } from '../../constants/AppConstants';

import Verse from '../Verse.react';

// use named export for unconnected component (unit tests)
export class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { active, lowerBound, upperBound, verses, mode, recallStage } = this.props.data;

    /**
     * Take into account the current mode, and determine if we can navigation backward.
     *
     * @TODO make this better than a simple index check (which is only good for verse mode)
     *
     * @return boolean Whether or not we can navigate backward
     */
    function canNavigatePrevious() {
      return activeVerse > 0;
    }

    /**
     * Take into account the current mode, and determine if we can navigation backward.
     *
     * @TODO make this better than a simple index check (which is only good for verse mode)
     *
     * @return boolean Whether or not we can navigate forward
     */
    function canNavigateNext() {
      return activeVerse < verses.length - 1;
    }

    let renderedVerses = ''

    if (verses) {
      renderedVerses = verses.map(function(verse, index) {
        if (index < lowerBound || index > upperBound) {
          return '';
        }

        return (
          <Verse key={ index }
                 verse={ verse.verse }
                 text={ verse.text }
                 recallStage={ recallStage } />
        );
      });
    }

    return (
      <div>
        <div className="mode-controls">
          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(VERSE_MODE)) }}>'Single verse'</button>

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(SEGMENT_MODE)) }}>'Group of verses'</button>

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(CHAPTER_MODE)) }}>'Full chapter'</button>
        </div>

        <div className="verse-controls">
          <button className="previous"
                  title="Previous"
                  disabled="{ canNavigatePrevious() }"
                  onClick={() => { dispatch(asyncPreviousVerse()) }}>
            Previous
          </button>

          <button className="next"
                  title="Next"
                  disabled="{ canNavigateNext() }"
                  onClick={() => { dispatch(asyncNextVerse()) }}>
            Next
          </button>
        </div>

        <div className="verse-wrapper">
          { renderedVerses }
        </div>

        <p><a href="http://www.esv.org" className="copyright">ESV</a></p>
      </div>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(PassagePage);
