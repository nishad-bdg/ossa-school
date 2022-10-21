import React, { Component } from 'react'
import mobile from '../image/img/mobile-icon.svg'
import dolarNote from '../image/img/dolar-note.svg'
import bigIcon from '../image/img/big-icon.svg'
import sendEmail from '../image/img/Send Email.svg'
import './FifthContainer.css'

export default class FifthContainer extends Component {
  render() {
    return (
        <div className='five-container'>
        <h1 className='sec-container-heading'>HOW TO USE</h1>
        <p className='sec-container-text'>使い方は3ステップで簡単!</p>
        <div className='five-div-cart-parent'>
            <div className='five-div-cart'>
              <div className='img-border'>
                <img src={mobile} alt="" />
              </div>
              <div className='five-div-cart-text'>
                <p>自分の希望に合った<br />
                  語学学校・プランを探す</p>
              </div>
            </div>

            <div className='big-icon'> <img src={bigIcon} alt="" /></div>

            <div className='five-div-cart'>
              <div className='img-border'>
                <img src={dolarNote} alt="" />
              </div>
              <div className='five-div-cart-text'>
                <p>見積もりをとって<br />
                    留学費用を確認する</p>
              </div>
            </div>

            <div> <img className='big-icon' src={bigIcon} alt="" /></div>

            <div className='five-div-cart'>
              <div className='img-border'>
                <img src={sendEmail} alt="" />
              </div>
              <div className='five-div-cart-text'>
                <p>空き状況を確認して<br />
                  お申し込みする</p>
              </div>
            </div>
        </div>
    </div>
    )
  }
}
