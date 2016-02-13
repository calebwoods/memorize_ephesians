/*
 * AudioPlayer
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';
import { VERSE_STATES } from '../constants/AppConstants';

class AudioPlayer extends Component {
  render() {
    const { dispatch, src, verseState, index } = this.props;

    if (verseState == VERSE_STATES.AUDIO) {
      return (
        <span className="audioContainer">
          <span>audio playing...</span>
          <audio src={ src } autoPlay="autoPlay" loop="loop"/>
        </span>
      );
    } else {
      return (
        <span className="audioContainer"></span>
      );
    }
  }
}

export default AudioPlayer
