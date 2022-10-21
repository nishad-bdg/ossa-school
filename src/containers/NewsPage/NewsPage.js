import React, { Component } from 'react'
import './NewsPage.css';
import { Footer } from '../../components'
import TopbarContainer from '../TopbarContainer/TopbarContainer'
import TopBanner from './TopBanner/TopBanner';
import SecContainer from './SecContainer/SecContainer';

export default class NewsPage extends Component {
  render() {
    return (
      <div className='my-container'>
        <TopbarContainer />
        <TopBanner />
        <SecContainer />        
        <Footer />
      </div>
    )
  }
}
