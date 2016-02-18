/*
 * PassagePage
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { asyncNavigateNext, asyncNavigatePrevious, asyncChangeMode, asyncChangeRecall } from '../../actions/AppActions';
import { VERSE_MODE, SEGMENT_MODE, CHAPTER_MODE, RECALL_STAGES } from '../../constants/AppConstants';

import AudioPlayer from '../AudioPlayer.react';
import Swipeable from 'react-swipeable';

// use named export for unconnected component (unit tests)
export class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { active, verses, segments, chapters, mode, recallStage, isAudioPlaying } = this.props.data;

    /**
     * Take into account the current mode, and determine if we can navigation backward.
     *
     * @TODO make this better than a simple index check (which is only good for verse mode)
     *
     * @return boolean Whether or not we can navigate backward
     */
    function canNavigatePrevious() {
      return true;
    }

    /**
     * Take into account the current mode, and determine if we can navigation backward.
     *
     * @TODO make this work.
     *
     * @return boolean Whether or not we can navigate forward
     */
    function canNavigateNext() {
      return true;
    }

    let activePassage = {}
    if (mode === VERSE_MODE) {
      activePassage = verses[active[VERSE_MODE]];
    } else if (mode === SEGMENT_MODE) {
      activePassage = segments[active[SEGMENT_MODE]];
    } else {
      activePassage = chapters[active[CHAPTER_MODE]];
    }

    return (
      <div>
        <div className="mode-controls">
          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(VERSE_MODE)) }}>Single verse</button>

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(SEGMENT_MODE)) }}>Group of verses</button>

          <button className="scripture-mode" onClick={() => { dispatch(asyncChangeMode(CHAPTER_MODE)) }}>Full chapter</button>
        </div>

        <div className="meta-information">
          { activePassage.metadata() }
        </div>

        <div className="verse-controls">
          <button className="previous"
                  title="Previous"
                  disabled={ !canNavigatePrevious() }
                  onClick={() => { dispatch(asyncNavigatePrevious()) }}>
            Previous
          </button>

          <button className="next"
                  title="Next"
                  disabled={ !canNavigateNext() }
                  onClick={() => { dispatch(asyncNavigateNext()) }}>
            Next
          </button>
        </div>

        <Swipeable
          className="verse-wrapper"
          onSwipedLeft={() => { dispatch(asyncNavigateNext()) }}
          onSwipedRight={() => { dispatch(asyncNavigatePrevious()) }}>

          <p dangerouslySetInnerHTML={{ __html: activePassage[recallStage]() }}></p>
          <p><a href="http://www.esv.org" className="copyright">ESV</a></p>
        </Swipeable>

        <div className="stage-controls">
          <button
            className={ recallStage == RECALL_STAGES.FULL ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.FULL)) }}
          >Know</button>

          <button
            className={ recallStage == RECALL_STAGES.FIRST ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.FIRST)) }}
          >K___</button>

          <button
            className={ recallStage == RECALL_STAGES.NONE ? "active" : ""}
            onClick={() => { dispatch(asyncChangeRecall(RECALL_STAGES.NONE)) }}
          >____</button>

          <AudioPlayer className="audio-controls"
                       src={ activePassage.audioUrl() }
                       dispatch={ dispatch }
                       isAudioPlaying={ isAudioPlaying } />
        </div>
      </div>
    );
  }
}

function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(PassagePage);
