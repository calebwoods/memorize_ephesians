/*
 * PassagePage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from "../AudioPlayer.react";
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
    if (mode === SINGLE_MODE && activeVerse < totalVerses - 1) {
      nextButton = <button className="next" onClick={() => { dispatch(asyncNextVerse()) }}>Next</button>
    }
    let previousButton = ''
    if (mode === SINGLE_MODE && activeVerse > 0) {
      previousButton = <button className="previous" onClick={() => { dispatch(asyncPreviousVerse()) }}>Previous</button>
    }

    let renderedVerses = ''
    if (verses) {
      // render the verses based on mode
      let targetVerses = (mode === SINGLE_MODE) ? [verses[activeVerse]] : verses;

      renderedVerses = targetVerses.map(function(verse, index) {
        return <Verse key={ index }
                      index={ index }
                      dispatch={ dispatch }
                      {...verse} />;
      })
    }

    let newMode = (mode === SINGLE_MODE) ? MULTI_MODE : SINGLE_MODE;

    const audioUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=" +
      encodeURI(verseMetadata) + "&output-format=mp3";

    return (
      <div>
        <div className="verse-controls">
          { previousButton }
          { nextButton }

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(newMode)) }}>{ MODES[newMode] }</button>
        </div>

        <div className="verse-wrapper">
          <ul>
            { renderedVerses }
          </ul>
        </div>

        <div>
          <p><a href="http://www.esv.org" className="copyright">ESV</a></p>

          <button className="enable-recall" onClick={() => { dispatch(asyncEnableRecall()) }}>Enable Recall</button>
          <button className="disable-recall" onClick={() => { dispatch(asyncDisableRecall()) }}>Disable Recall</button>

          <AudioPlayer src={ audioUrl }/>
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
