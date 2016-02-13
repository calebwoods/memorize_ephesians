/*
 * Verse
 */

import { asyncEnableRecall, asyncEnableRead, asyncEnableListen } from '../actions/AppActions';
import { VERSE_STATES } from '../constants/AppConstants';

import React, { Component } from 'react';
import AudioPlayer from './AudioPlayer.react';
import Swipeable from 'react-swipeable';

class Verse extends Component {
  render() {
    const { index, book, chapter, text, verse, verseState, dispatch } = this.props;
    const verseMeta = book + ' ' + chapter + ':' + verse;

    const audioUrl = "http://www.esvapi.org/v2/rest/passageQuery?key=IP&passage=" +
      encodeURI(verseMeta) + "&output-format=mp3";

    function splitText(text) {
      return text.split(' ').map(function (word) {
        return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
      }).join(' ');
    }

    function nextState(index) {
      if (verseState == VERSE_STATES.READ) {
        dispatch(asyncEnableRecall(index))
      } else if (verseState == VERSE_STATES.RECALL) {
        dispatch(asyncEnableListen(index))
      }

    }

    function previousState(index) {
      if (verseState == VERSE_STATES.RECALL) {
        dispatch(asyncEnableRead(index))
      } else if (verseState == VERSE_STATES.LISTEN) {
        dispatch(asyncEnableRecall(index))
      }
    }

    return (
      <Swipeable
        className="passage-card"
        onSwipedLeft={() => { nextState(index) }}
        onSwipedRight={() => { previousState(index) }}
      >
        <p className="passage-metadata">{ verseMeta }</p>
        <p className="passage-text">{ verseState == VERSE_STATES.RECALL ? splitText(text) : text }</p>

        <AudioPlayer src={ audioUrl }
                     dispatch={ dispatch }
                     verseState={ verseState }
                     index={ index } />
        <ol className="passage-states">
          <li
            className={ verseState == VERSE_STATES.READ ? "active" : ""}
            onClick={() => { dispatch(asyncEnableRead(index)) }}
          >Read</li>
          <li
            className={ verseState == VERSE_STATES.RECALL ? "active" : ""}
            onClick={() => { dispatch(asyncEnableRecall(index)) }}
          >Recall</li>
          <li
            className={ verseState == VERSE_STATES.LISTEN ? "active" : ""}
            onClick={() => { dispatch(asyncEnableListen(index)) } }
          >Listen</li>
        </ol>
      </Swipeable>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default Verse;
