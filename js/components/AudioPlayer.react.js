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
          <li className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio(index))} }>
            <i className="fa fa-pause" title="pause"></i>
          </li>
          <audio src={ src } autoPlay="autoPlay" loop="loop"/>
        </span>
      );
    } else {
      return (
        <span className="audioContainer">
          <li className="playAudio" onClick={() => {dispatch(asyncPlayAudio(index))} }>
            <i className="fa fa-play" title="play"></i>
          </li>
        </span>
      );
    }
  }
}

export default AudioPlayer
