/*
 * PassagePage
 */

import { asyncNextVerse, asyncPreviousVerse } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import Verse from '../Verse.react';

class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { activeVerse, totalVerses, verses, mode } = this.props.data;

    let nextButton = ''
    if (mode === 'single' && activeVerse < totalVerses - 1) {
      nextButton = <button className="next" onClick={() => { dispatch(asyncNextVerse()) }}>Next</button>
    }
    let previousButton = ''
    if (mode === 'single' && activeVerse > 0) {
      previousButton = <button className="previous" onClick={() => { dispatch(asyncPreviousVerse()) }}>Previous</button>
    }

    return (
      <div>
        <div className="verse-controls">
          { previousButton }
          { nextButton }
        </div>

        <div className="verse-wrapper">
          <ul>
            {verses.map(function(verse, index) {
              return <Verse key={ index }
                            index={ index }
                            dispatch={ dispatch }
                            {...verse} />;
            })}
          </ul>
        </div>

        <div>
          <p><a href="http://www.esv.org" className="copyright">ESV</a></p>
        </div>
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
