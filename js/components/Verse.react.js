/*
 * Verse
 */

import { asyncEnableRecall, asyncDisableRecall } from '../actions/AppActions';
import React, { Component } from 'react';

class Verse extends Component {
  render() {
    const { index, book, chapter, text, verse, isRecalling, dispatch } = this.props;

    function splitText(text) {
      return text.split(' ').map(function (word) {
        return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
      }).join(' ');
    }

    return (
      <li>
        <div className="passage-card">
          <p className="passage-metadata">{ book + ' ' + chapter + ':' + verse }</p>
          <p className="passage-text">{ isRecalling ? splitText(text) : text }</p>

          <button className="enable-recall" onClick={() => { dispatch(asyncEnableRecall(index)) }}>Enable Recall</button>
          <button className="disable-recall" onClick={() => { dispatch(asyncDisableRecall(index)) }}>Disable Recall</button>
        </div>
      </li>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default Verse;
