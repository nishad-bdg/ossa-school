import React, { Component } from 'react'
import './TopBanner.css'
import arrowIcon from "../image/img/banner-arrow.png";

export default class TopBanner extends Component {
  render() {
    return (
        <div className='top-banner'>
          <div className='top-banner-text'>
            <h1>らしく、<br />いきたい</h1>
          </div>
        </div>
    )
  }
}
