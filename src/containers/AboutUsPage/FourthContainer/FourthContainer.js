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
        <div className='four-component'>
          <div className='content-component'>
              <div className='reason-firs-part'>
                <h1 className='sec-container-heading'>POINT</h1>
                <p className='sec-container-text'>こんなひとにおすすめ!</p>
                  <div className='first-part-child'>
                        <div>
                            <div className='img-text'>
                              <img src={ticImg} alt="" />
                              <h2>とにかく<span className='text-blue'>安く</span>申し込みたい方</h2>
                            </div>
                            <div className='four-pink-line'></div>
                        </div>
                        <div>
                            <div className='img-text'>
                              <img src={ticImg} alt="" />
                              <h2><span className='text-blue'>希望の国</span>や<span className='text-blue'>プラン</span>が決まっている方</h2>
                            </div>
                            <div className='four-pink-line'></div>
                        </div>
                        <div>
                            <div className='img-text'>
                              <img src={ticImg} alt="" />
                              <h2>現地スタッフと<span className='text-blue'>直接やりとり</span>をしたい方</h2>
                            </div>
                            <div className='four-pink-line'></div>
                        </div>
                        <div>
                            <div className='img-text'>
                              <img src={ticImg} alt="" />
                              <h2>自分のペースで<span className='text-blue'>留学プラン</span>を探したい方</h2>
                            </div>
                            <div className='four-pink-line'></div>
                        </div>
                  </div>
              </div>

              <div className='sec-part-child'>
                <h1 className='sec-container-heading'>REASON</h1>
                <p className='sec-container-text'>最低価格保証を実現できる理由</p>

                  <div className='reason-parent-div'>
                      <div className='reason-div'>
                        <div className='reaseon-cart-img'>
                            <img src={reasonOne} alt="" />
                        </div>
                        <div className='reason-all-text'>
                            <h2 className='reason-text-blue'>いつでもどこでも申し込める</h2>
                            <div className='reason-pink-line'></div>
                            <p className='reason-p'>語学学校/宿泊先の空き状況やキャンペーン情報をリアルタイムで知ることができるため、warpleならいつでもどこでも申し込んだり留学準備を進めることができます。</p>
                        </div>
                      </div>
                      <div className='reason-div'>
                        <div>
                            <img className='reaseon-cart-img' src={reasonOne} alt="" />
                        </div>
                        <div className='reason-all-text'>
                            <h2 className='text-blue'>いつでもどこでも申し込める</h2>
                            <div className='reason-pink-line'></div>
                            <p className='reason-p'>語学学校/宿泊先の空き状況やキャンペーン情報をリアルタイムで知ることができるため、warpleならいつでもどこでも申し込んだり留学準備を進めることができます。</p>
                        </div>
                      </div>
                      <div className='reason-div'>
                        <div>
                            <img className='reaseon-cart-img' src={reasonOne} alt="" />
                        </div>
                        <div className='reason-all-text'>
                            <h2 className='text-blue'>いつでもどこでも申し込める</h2>
                            <div className='reason-pink-line'></div>
                            <p className='reason-p'>語学学校/宿泊先の空き状況やキャンペーン情報をリアルタイムで知ることができるため、warpleならいつでもどこでも申し込んだり留学準備を進めることができます。</p>
                        </div>
                      </div>
                  </div>
              </div>

          </div>
          <div className='plane-img'>
                <img src={plane} alt="" />
            </div>

        </div>
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
