/*
 * Verse
 */

import { asyncEnableRecall, asyncDisableRecall } from '../actions/AppActions';

import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer.react';

class Verse extends Component {
  render() {
    const { index, book, chapter, text, verse, isRecalling, isAudioPlaying, dispatch } = this.props;
    const verseMeta = book + ' ' + chapter + ':' + verse;

    const audioUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=" +
      encodeURI(verseMeta) + "&output-format=mp3";

    function splitText(text) {
      return text.split(' ').map(function (word) {
        return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
      }).join(' ');
    }

    return (
      <li>
        <div className="passage-card">
          <p className="passage-metadata">{ verseMeta }</p>
          <p className="passage-text">{ isRecalling ? splitText(text) : text }</p>

          <button className="enable-recall" onClick={() => { dispatch(asyncEnableRecall(index)) }}>Enable Recall</button>
          <button className="disable-recall" onClick={() => { dispatch(asyncDisableRecall(index)) }}>Disable Recall</button>

          <AudioPlayer src={ audioUrl }
                       dispatch={ dispatch }
                       isAudioPlaying={ isAudioPlaying }
                       index={ index } />
        </div>
      </li>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default Verse;
