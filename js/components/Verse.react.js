/*
 * Verse
 */

import { asyncEnableRecall, asyncDisableRecall } from '../actions/AppActions';
import React, { Component } from 'react';

class Verse extends Component {
  componentDidMount() {
    if (this.props.text) {
      let text = this.props.text;

      let splitText = text.split(' ').map(function (word) {
        return word[0] + word.slice(1, word.length).replace(/\w/g, ' ');
      }).join(' ')

      this.setState({
        splitText: splitText
      });
    }
  }

  render() {
    const { index, book, chapter, text, verse, isRecalling, dispatch } = this.props;
    const { splitText } = this.state;

    return (
      <li>
        <div className="passage-card">
          <p className="passage-metadata">{ book + ' ' + chapter + ':' + verse }</p>
          <p>{ isRecalling ? splitText : text }</p>

          <button className="enable-recall" onClick={() => { dispatch(asyncEnableRecall(index)) }}>Enable Recall</button>
          <button className="disable-recall" onClick={() => { dispatch(asyncDisableRecall(index)) }}>Disable Recall</button>
        </div>
      </li>
    );
  }
}

// Wrap the component to inject dispatch and state into it
export default Verse;
