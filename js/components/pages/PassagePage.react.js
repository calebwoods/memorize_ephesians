/*
 * PassagePage
 */

import { asyncNextVerse, asyncPreviousVerse, asyncEnableRecall, asyncDisableRecall } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AudioPlayer from "../AudioPlayer.react";
import { Link } from 'react-router';

class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { verse, verseCount, verseIndex, verseText, verseMetadata } = this.props.data;
    let nextButton = ''
    if (verseIndex < verseCount - 1) {
      nextButton = <button className="next" onClick={() => { dispatch(asyncNextVerse()) }}>Next</button>
    }
    let previousButton = ''
    if (verseIndex > 0) {
      previousButton = <button className="previous" onClick={() => { dispatch(asyncPreviousVerse()) }}>Previous</button>
    }

    const audioUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=" +
      encodeURI(verseMetadata) + "&output-format=mp3";

    return (
      <div>
        <div className="passage-card">
          { previousButton }
          <p className="passage-metadata">{ verseMetadata }</p>
          <p>{ verseText }</p>
          { nextButton }
          <button className="enable-recall" onClick={() => { dispatch(asyncEnableRecall()) }}>Enable Recall</button>
          <button className="disable-recall" onClick={() => { dispatch(asyncDisableRecall()) }}>Disable Recall</button>
          <AudioPlayer src={ audioUrl }/>
        </div>
        <p><a href="http://www.esv.org" class="copyright">ESV</a></p>
      </div>
    );
  }
}

// REDUX STUFF

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(PassagePage);
