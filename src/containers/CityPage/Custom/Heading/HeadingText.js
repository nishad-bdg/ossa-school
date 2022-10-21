import React, { Component } from 'react'
import css from './HeadingText.module.css';

export default class HeadingText extends Component {
  render() {
    return (
      <h1 className={css.heading_Text}>{this.props.children}</h1>
    )
  }
}
