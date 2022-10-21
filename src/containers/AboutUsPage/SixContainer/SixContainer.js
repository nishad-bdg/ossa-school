import React, { Component } from 'react'
import groupImg from '../image/img/first-group-img.svg'
import secgroupImg from '../image/img/sec-group-img.svg'
import circImg from '../image/img/circ.svg'
import crossImg from '../image/img/cross.svg'
import triangleImg from '../image/img/triangle.svg'
import './SixContainer.css';

export default class SixContainer extends Component {
  render() {
    return (
        <div className='six-container'>
        <h1 className='sec-container-heading'>DIFFERENCE</h1>
        <p className='sec-container-text'>留学エージェントとwarpleの違い</p>
        <div>
            <div className='six-component-div-cart'>
               <div className='all-cart-parent'>
               <div className='six-text-single-cart'>
                                <div className='six-text-inner-div'>
                                    <div className='emty-box'>

                                    </div>
                                    <div>
                                        <h3>留学費用</h3>
                                    </div>
                                    <div className='marginTop'>
                                        <h3>情報の<br />
                                            正確さ</h3>
                                    </div>
                                    <div>
                                        <h3>学校選択の<br />
                                            自由度</h3>
                                    </div>
                                    <div>
                                        <h3>サポート</h3>
                                    </div>

                                </div>
                        </div>
                    <div className='six-div-single-cart'>
                            <h2 className='six-div-twoText text-padding-top'>warple</h2>
                                <div className='six-com-inner-div'>
                                    <div className='group-img'>
                                        <img src={groupImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={circImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={circImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={circImg} alt="" />
                                    </div>
                                    <div className='triangle-img'>
                                        <img src={triangleImg} alt="" />
                                    </div>

                                </div>
                        </div>

                        <div className='six-div-single-cart bg-color-gray'>
                            <h2 className='six-div-twoText'>従来の留学エージェント</h2>
                                <div className='six-com-inner-div'>
                                    <div className='group-img'>
                                        <img src={secgroupImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={crossImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={triangleImg} alt="" />
                                    </div>
                                    <div className='circ-img'>
                                        <img src={triangleImg} alt="" />
                                    </div>
                                    <div className='triangle-img'>
                                        <img src={circImg} alt="" />
                                    </div>
                                </div>

                        </div>
                        <div className='one-doted-border'></div>
                        <div className='two-doted-border'></div>
                        <div className='three-doted-border'></div>
                        <div className='four-doted-border'></div>
                        <div className='five-doted-border'></div>
               </div>


            </div>
        </div>
        <div className='mobile-view-div'>
            <div className='mobile-view-child'>
                <h2 className='mobile-view-blue-text'><li><span className='span-text'>warple</span></li></h2>
                <div className='mobile-view-img'>
                    <img src={groupImg} alt=""/>
                </div>
            </div>
            <div className='mobile-view-child'>
                <h2 className='mobile-view-gray-text'><li>
                    <span className='span-text'>従来の留学エージェント</span>
                    </li></h2>
                <div  className='mobile-view-img'>
                    <img src={secgroupImg} alt=""/>
                </div>
            </div>
        </div>


    </div>
    )
  }
}
