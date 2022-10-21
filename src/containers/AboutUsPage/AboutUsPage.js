import React, { Component } from 'react'
import './AboutUsPage.css';
import { Footer } from '../../components'
import TopbarContainer from '../TopbarContainer/TopbarContainer'
import TopBanner from './TopBanner/TopBanner';
import SecContainer from './SecContainer/SecContainer';
import ThirdContainer from './ThirdContainer/ThirdContainer';
import FourthContainer from './FourthContainer/FourthContainer';
import FifthContainer from './FifthContainer/FifthContainer';
import SixContainer from './SixContainer/SixContainer';
import SevenContainer from './SevenContainer/SevenContainer';

export default class AboutUsPage extends Component {
  render() {
    return (
      <div className='my-container'>
        <TopbarContainer />
        <TopBanner />
        <SecContainer />
        <ThirdContainer />
        <FourthContainer />
        <FifthContainer />
        <SixContainer />
        <SevenContainer />

        <Footer />
      </div>
    )
  }
}
