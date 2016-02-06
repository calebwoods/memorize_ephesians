/*
 * AudioPlayer
 */

import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioPlayer extends Component {
  render() {
    const { dispatch, src } = this.props;
    const { isAudioPlaying } = this.props.data;

    if (isAudioPlaying) {
      return (
        <span className="audioContainer">
          <button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio())} }>Pause Audio</button>
          <audio src={ src } autoPlay="autoPlay" loop="loop"/>
        </span>
      );
    } else {
      return (
        <span className="audioContainer">
          <button className="playAudio" onClick={() => {dispatch(asyncPlayAudio())} }>Play Audio</button>
        </span>
      );
    }
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
export default connect(select)(AudioPlayer);
