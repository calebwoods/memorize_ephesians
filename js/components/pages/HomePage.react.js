/*
 * HomePage
 * This is the first thing users see of our App
 */

import { asyncChangeProjectName, asyncChangeOwnerName } from '../../actions/AppActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as passage from '../../passage'

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
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      density: 10
    }
  }
  updateDensity() {
    this.setState({ density: parseInt(this.refs.density.value) });
  }
  render() {
    const density = this.state.density
    return (
      <div>
        <div className="density-control">
          <input onChange={this.updateDensity.bind(this)} type="range" name="density" ref="density" min="1" max="10" defaultValue="10" />
        </div>
        <p className="passage">
          {
            passage.words().map(function (word, index) {
              return <Word density={density} text={word} key={index} wordIndex={index} />;
            })
          }
        </p>
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
export default connect(select)(HomePage);
