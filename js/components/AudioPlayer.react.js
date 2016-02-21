/*
 * AudioPlayer
 */
import React, { Component } from 'react';
import Mousetrap from 'mousetrap'
import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';

class AudioPlayer extends Component {
  componentDidMount() {
    Mousetrap.bind('p', () => {
      if (this.props.isAudioPlaying) {
        this.props.dispatch(asyncPauseAudio())
      } else {
        this.props.dispatch(asyncPlayAudio())
      }
    });
  }

  componentWillUnmount() {
    Mousetrap.unbind('p');
  }

  render() {
    const { dispatch, src, isAudioPlaying } = this.props;

    if (isAudioPlaying) {
      return (
        <span className="audioContainer">
          <button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio())} }>
            <i className="fa fa-pause" title="pause"></i>
          </button>
          <audio src={ src } autoPlay="autoPlay" loop="loop"/>
        </span>
      );
    } else {
      return (
        <span className="audioContainer">
          <button className="playAudio" onClick={() => {dispatch(asyncPlayAudio())} }>
            <i className="fa fa-play" title="play"></i>
          </button>
        </span>
      );
    }
  }
}

export default AudioPlayer
