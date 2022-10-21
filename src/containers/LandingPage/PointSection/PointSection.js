import React, { Component } from 'react'
import one from '../image/img/one.svg'
import two from '../image/img/two.svg'
import three from '../image/img/three.svg'
import './PointSection.css';

export default class PointSection extends Component {
  render() {
    return (
        <div className='third-container'>
        <h1 className='sec-container-heading'>POINT</h1>
        <p className='sec-container-text'>warpleの3つのポイント</p>
        <div className='tree-img-cart'>
            <div className='single-cart'>
                <div className='img-third-div'>
                    <img src={one} alt="" />
                </div>
                <div className='text-three-div'>
                    <h1>どこよりも<br />
                        安く留学できる</h1>
                    <div className='three-pink-line'></div>
                    <p>warple は、 お申し込みから渡航の準備まで留学に
                        関わるすべてをWEB上で完結させることで、 語学
                        学校に直接申し込むよりも安い費用で留学すること
                        が可能です。</p>
                </div>
            </div>
            <div className='single-cart end-flex'>

                <div className='img-third-div'>
                    <img src={two} alt="" />
                </div>

                <div className='text-three-div'>
                    <h1>自分の理想プランを<br />
                        見つけやすい</h1>
                    <div className='three-pink-line'></div>
                    <p>語学学校と直接繋がることができるシステムになっており、現地のリアルで正確な情報を知ることができるため、自分で自由に情報を見ながら留学プランを決めることができます。※語学学校と1on1のチャットができるのは申し込み後です。</p>
                </div>
            </div>
            <div className='single-cart'>

                <div className='img-third-div'>
                    <img src={three} alt="" />
                </div>

                <div className='text-three-div'>
                    <h1>いつでもどこでも<br />
                        申し込める</h1>
                    <div className='three-pink-line'></div>
                    <p>語学学校/宿泊先の空き状況やキャンペーン情報をリアルタイムで知ることができるため、warpleならいつでもどこでも申し込んだり留学準備を進めることができます。</p>
                </div>
            </div>
        </div>
    </div>
    )
  }
}
