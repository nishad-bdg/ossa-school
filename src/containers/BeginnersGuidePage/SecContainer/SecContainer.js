import React, { Component } from 'react'
import vectorImg from '../image/img/vector-one.svg'
import btnIcon from '../image/img/btn-icon.svg'
import './SecContainer.css'

export default class SecContainer extends Component {
  render() {
    return (
        <div className='sec-container'>
        <h1 className='sec-container-heading'>WHAT IS Beginners Guide</h1>        
            <div className='sec-container-div'>
                <div className='div-img'>
                    <img src={vectorImg} alt="" />
                </div>

                <div className='div-text'>
                    <h1>留学を、 <br />
                        もっとかしこく、 <br />
                        おもしろく。
                    </h1>
                    <div className='pink-line'> </div>
                    <p>
                    warple は、語学学校/プログラムの検索や申込み、 渡航までの準備や学校/宿泊先の手配まで 留学に必要なすべてをインターネット上で完結させることにより、 どこよりも安く、どこよりもあなたらしく、 留学が実現できるサービスです。
                    </p>
                </div>
            </div>            
    </div>
    )
  }
}
