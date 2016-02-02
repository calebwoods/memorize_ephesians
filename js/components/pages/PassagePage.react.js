/*
 * PassagePage
 */

import { asyncNextVerse, asyncPreviousVerse } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Word extends Component {
  render() {
    let display = true
    const levels = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    const wordIndex = this.props.wordIndex
    const density = this.props.density
    levels.forEach(function (level) {
      const modulo = wordIndex % (level + 1)
      if (density < 10 && level >= density && modulo === 0) {
        display = false
      }
    });
    const displayClass = display ? 'word visable' : 'word hidden';
    return (
      <span className={ displayClass }>{ this.props.text }</span>
    )
  }
}

class Passage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const { verse, verseCount, verseIndex, verseText, verseMetadata } = this.props.data;
    let nextButton = ''
    if (verseIndex < verseCount - 1) {
      nextButton = <button className="next" onClick={() => { dispatch(asyncNextVerse()) }}>Next</button>
    }
    let previousButton = ''
    if (verseIndex > 0) {
      previousButton = <button className="previous" onClick={() => { dispatch(asyncPreviousVerse()) }}>Previous</button>
    }
    return (
      <div className="passage-card">
        { previousButton }
        <span className="passage-metadata">{ verseMetadata }</span>
        <p>{ verseText }</p>
        { nextButton }
      </div>
    )
  }
}

class PassagePage extends Component {
  render() {
    const dispatch = this.props.dispatch;
    const data = this.props.data;
    return (
      <div>
        <Passage data={ data } dispatch={ dispatch } />
        <p><a href="http://www.esv.org" class="copyright">ESV</a></p>
      </div>
    );
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
export default connect(select)(PassagePage);
