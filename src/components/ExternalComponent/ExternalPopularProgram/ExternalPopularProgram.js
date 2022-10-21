import React from 'react';
import './ExternalPopularProgram.css';
import card1 from '../../../images/card1.jpg';
import card2 from '../../../images/card2.jpg';
import card3 from '../../../images/card3.jpg';
import card4 from '../../../images/card4.jpg';
import usaflag from '../../../images/usa-flag.png';
import ukflag from '../../../images/uk-flag.png';

const ExternalPopularProgram = () => {
    return (
        <div style={{ backgroundColor: '#ffffff', padding: '30px' }}>
            <div className="container">
                <h2 style={{ color: '#FF7E84', marginBottom: '20px' }}>今月人気の留学プログラムTOP5</h2>
                <p>まずは人気プログラムをランキング形式でご紹介! 「みんなが気になっているプログラムは?」 ｢このプログラムでは何ができるの?」 などな <br />

                    ど、 ぜひ詳しい情報をチェックしてみてくださいね。</p>

                <div className="row row-cols-1 row-cols-md-2 g-4">
                    <div className="col">
                        <div className="card popular-card">
                            <img src={card1} className="card-img-top" alt="..." />
                            <div className="card-body popular-card-body">
                                <h5 className="card-title">観光も勉強も充実! アメリカのボスト <br /> ンで語学留学</h5>
                                <p className="card-text">
                                    <p><img style={{ width: '30px', height: '20px' }} src={usaflag} alt="" /> <span>アメリカ</span>
                                    </p>

                                </p>
                                <div style={{ backgroundColor: '#F8F8F8' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button className='btn'>177,800円~</button>
                                        <button className='btn'>7日間~</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card popular-card">
                            <img src={card2} className="card-img-top" alt="..." />
                            <div className="card-body popular-card-body">
                                <h5 className="card-title">アフターヌーンティーも学べる♪ロン<br /> ドン語学留学</h5>
                                <p className="card-text">
                                    <p><img style={{ width: '30px', height: '20px' }} src={ukflag} alt="" /> <span>イギリス</span>
                                    </p>

                                </p>
                                <div style={{ backgroundColor: '#F8F8F8' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                                        <button className='btn'>259,000円~</button>
                                        <button className='btn'>7日間~</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card popular-card">
                            <img src={card3} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">【超格安!長期のニューヨーク留学】<br />
                                    マンハッタンの名門校で学ぶ
                                </h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card popular-card">
                            <img src={card4} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">【今、行けるプラン】 カナダ(バンク <br /> ーバー)の人気校で長期英語研修</h5>
                                <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalPopularProgram;