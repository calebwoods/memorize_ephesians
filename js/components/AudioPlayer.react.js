/*
 * AudioPlayer
 */

import { asyncPlayAudio, asyncPauseAudio } from '../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class AudioPlayer extends Component {
	render() {
		const dispatch = this.props.dispatch;
		const { verseMetadata, audioPlaying } = this.props.data;

		const encodedVerseMeta = verseMetadata.replace(/ /, "+");
		const audioUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=" + encodedVerseMeta + "&output-format=mp3";

		if (audioPlaying) {
			return (
				<span className="audioContainer">
					<button className="pauseAudio" onClick={() => {dispatch(asyncPauseAudio())} }>Pause Audio</button>
					<audio src={ audioUrl } autoPlay="autoPlay" loop="loop"/>
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
