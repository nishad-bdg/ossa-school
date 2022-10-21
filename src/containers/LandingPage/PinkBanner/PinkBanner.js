import React, { Component } from 'react'
import upticaetImg from '../image/img/cut-up-ticaket.svg'
import bottomticaetImg from '../image/img/bottom-ticate.svg'
import btnIcon from '../image/img/btn-icon.svg'
import './PinkBanner.css';

export default class PinkBanner extends Component {
  render() {
    return (
        <div className='seven-pink-div'>
        <div className='cut-up-ticket'>
            <img src={upticaetImg} alt="" />
        </div>

      <div className='seven-all-text'>
          <div className='seven-pink-div-child'>
            <h2><span className='seven-pink-text-bg'>会員登録</span>でお得な<span className='seven-pink-text-bg'>クーポン</span></h2>
            <h2 className='seven-pink-text-top'>プレゼント中!</h2>
          </div>
          <div className='seven-pink-btn'>
            <button>簡単30秒 ! 会員登録 <img className='seven-btn-icon-img' src={btnIcon} alt="" /></button>
          </div>
      </div>
      <div className='seven-bottom-ticket'>
            <img src={bottomticaetImg} alt="" />
        </div>
    </div>
    )
  }
}
