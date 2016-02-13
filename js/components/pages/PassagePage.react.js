/*
 * PassagePage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { asyncNextVerse, asyncPreviousVerse, asyncChangeMode } from '../../actions/AppActions';
import { MODES, SINGLE_MODE, MULTI_MODE } from '../../constants/AppConstants';

import Verse from '../Verse.react';

// use named export for unconnected component (unit tests)
export class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { activeVerse, totalVerses, verses, mode } = this.props.data;

    let nextButton = ''
    let previousButton = ''
    if (mode === SINGLE_MODE) {
      previousButton = <button
        title="Previous"
        disabled={activeVerse == 0}
        className="previous"
        onClick={() => { dispatch(asyncPreviousVerse()) }}
      >Previous</button>
      nextButton = <button
        title="Next"
        disabled={activeVerse >= totalVerses - 1}
        className="next"
        onClick={() => { dispatch(asyncNextVerse()) }}
      >Next</button>
    }

    let renderedVerses = ''
    if (verses) {
      // render the verses based on mode
      let targetVerses = (mode === SINGLE_MODE) ? [verses[activeVerse]] : verses;

      renderedVerses = targetVerses.map(function(verse, index) {
        return <Verse key={ verse.verseIndex }
                      index={ verse.verseIndex }
                      dispatch={ dispatch }
                      {...verse} />;
      })
    }

    let newMode = (mode === SINGLE_MODE) ? MULTI_MODE : SINGLE_MODE;

    return (
      <div>
        <div className="verse-controls">
          { previousButton }

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(newMode)) }}>{ MODES[newMode] }</button>

          { nextButton }
        </div>

        { renderedVerses }

        <p><a href="http://www.esv.org" class="copyright">ESV</a></p>
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
