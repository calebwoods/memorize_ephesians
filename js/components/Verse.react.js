/*
 * Verse
 */
import { RECALL_STAGES } from '../constants/AppConstants';

import React, { Component } from 'react';

class Verse extends Component {
  render() {
    const { verse, text, recallStage } = this.props;

    /**
     * Render the text to the verse based on the recall mode.
     */
    function renderText(text) {
      switch(recallStage) {
        case RECALL_STAGES.FULL:
          return text;

        case RECALL_STAGES.FIRST:
          return text.split(' ').map(function (word) {
            return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
          }).join(' ');

        // the eventual fourth recall stage for random words would live here

        case RECALL_STAGES.NONE:
          return '';
      }
    }

    return (
      <span>
        <span className="verse-number">
          <strong>{ verse }</strong>
        </span>

        <span className="verse-text">
          { renderText(text) }
        </span>
      </span>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default Verse;
