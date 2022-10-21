import React, { Component } from 'react'
import ticImg from '../image/img/tic-mark.svg'
import reasonOne from '../image/img/reason-1.svg'
import btnIcon from '../image/img/btn-icon.svg'
import Upticate from '../image/img/up-ticate.svg'
import bottomticate from '../image/img/bottom-ticate.svg'
import plane from '../image/img/plane.svg'
import './FourthContainer.css';

export default class FourthContainer extends Component {
  render() {
    return (
        <>        
        <div className='pink-div'>
            <div className='up-ticket'>
                <img src={Upticate} alt="" />
            </div>
          <div className='pink-div-text'>
              <div className='pink-div-child'>
                <h2><span className='pink-text-bg'>会員登録</span>でお得な<span className='pink-text-bg'>クーポン</span></h2>
                <h2 className='pink-text-top'>プレゼント中!</h2>
              </div>
              <div className='pink-btn'>
                <button>簡単30秒 ! 会員登録 <img className='btn-icon-img' src={btnIcon} alt="" /></button>
              </div>
          </div>
          <div className='bottom-ticket'>
                <img src={bottomticate} alt="" />
            </div>
        </div>
        </>
    )
  }
}
