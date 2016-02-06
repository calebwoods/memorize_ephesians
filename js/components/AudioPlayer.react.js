/*
 * AudioPlayer
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';

class AudioPlayer extends Component {
  render() {
    const { dispatch, src, isAudioPlaying, index } = this.props;

    if (isAudioPlaying) {
      return (
        <span className="audioContainer">
          <button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio(index))} }>Pause Audio</button>
          <audio src={ src } autoPlay="autoPlay" loop="loop"/>
        </span>
      );
    } else {
      return (
        <span className="audioContainer">
          <button className="playAudio" onClick={() => {dispatch(asyncPlayAudio(index))} }>Play Audio</button>
        </span>
      );
    }
  }
}

export default AudioPlayer
