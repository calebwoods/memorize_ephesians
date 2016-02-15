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

    /**
     * Take the current range of verses and generate meta information.
     *
     * @return string A string of verse meta information
     */
    function assembleMeta() {
      let meta = '';

      if (!verses || typeof lowerBound === 'undefined' || typeof upperBound === 'undefined') {
        return;
      }

      let lower = verses[lowerBound];

      // assemble the information for the lower bound
      meta += lower.book + ' ' + lower.chapter + ':' + lower.verse;

      // no need to continue if upper and lower are the same
      if (lowerBound === upperBound) {
        return meta;
      }

      let upper = verses[upperBound];

      // fill in the appropriate information for the upper bound
      // meaning we don't want to duplicate the same book
      // or the same chapter
      let bookTriggered = false,
          onlyVerse     = true;

      if (upper.book !== lower.book) {
        meta += ' - ' + upper.book + ' ';

        bookTriggered = true;
      }

      if (bookTriggered || upper.chapter !== lower.chapter) {
        if (!bookTriggered) {
          meta += ' - ';
        }

        meta += upper.chapter + ':';

        onlyVerse = false;
      }

      if (onlyVerse) {
        meta += '-';
      }

      meta += upper.verse;

      return meta;
    }

    /**
     * URL encode a string that can be used to get audio from the Crossway API.
     *
     * @return string The mp3 request string
     */
    function audioURL() {
      return 'http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=' +
             assembleMeta(assembleMeta()) + '&output-format=mp3';
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

        <div className="meta-information">
          { assembleMeta() }
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
