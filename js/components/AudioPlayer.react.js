/*
 * AudioPlayer
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';

class AudioPlayer extends Component {

  renderPlayButton() {
    const { dispatch } = this.props;
    this._audioElement = null;
    return (
      <button className="playAudio" onClick={() => {dispatch(asyncPlayAudio());}}>
        <i className="fa fa-play" title="play"></i>
      </button>
    );
  }

  renderPauseButtonAndAudio() {
    const { dispatch } = this.props;
    return (
      <span>
        <button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio())}}>
          <i className="fa fa-pause" title="pause"></i>
        </button>
        { this.renderAudioElement() }
      </span>
    );
  }

  renderAudioElement() {
    const { src } = this.props;
    return (
      <audio ref={(me) => {this._audioElement = me}} loop="loop">
        <source src={ src } type="audio/mp3"/>
      </audio>
    );
  }

  render() {
    const { isAudioPlaying } = this.props;
    return (
      <span className="audioContainer">
        { isAudioPlaying ? this.renderPauseButtonAndAudio() : this.renderPlayButton() }
      </span>
    )
  }

  componentDidUpdate() {
    if (this.props.isAudioPlaying) {
      // Call load in case we change verses while the audio is playing
      // Or else the audio element will keep using the old src
      this._audioElement.load();
      this._audioElement.play();
    }
  }
}

export default AudioPlayer
