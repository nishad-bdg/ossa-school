import React from 'react';
import { BsCheck2Circle } from "react-icons/bs";
import chooseimg from '../../../images/choose.png';
import './ExternalChooseUs.css';

const ExternalChooseUs = () => {
    return (
        <div>
            <div style={{ padding: '30px', marginTop: '30px', marginBottom: '30px', backgroundColor: '#FBFBFB' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div>
                                <h2 style={{ color: '#0a2640' }}>なぜスマ留が選ばれるのか</h2>
                                <p style={{ marginBottom: '40px' }}>スマ留は、日本中の全ての人達に <br />
                                    海外での語学留学・異文化交流を経験して欲しい。<br />
                                    そんな想いからスマ留は立ち上がりました。</p>
                            </div>
                            <div>
                                <p><BsCheck2Circle /> 留学費用が従来の最大半額
                                    <br />
                                    語学学校の空き時間や空き場所を利用するスマートな(賢い)留学スタイルで従来の最大半額を実現しました!
                                </p>
                                <p><BsCheck2Circle /> シンプルな料金体系
                                    <br />
                                    渡航先(行きたい国)×渡航期間(学校へ通う期間)さえ決まれば留学費用が明確に。費用も~表記になっていないので安心です。
                                </p>
                                <p><BsCheck2Circle /> 同一価格で語学学校が自由に選べる
                                    <br />
                                    従来は語学学校ごとに授業料等が違いますが、スマ留は同一価格なので、費用を気にせず語学学校を自由に選ぶことができます。
                                </p>
                                <p><BsCheck2Circle /> 充実の英語学習サポート
                                    <br />
                                    オンライン英会話と英語学習アプリが6カ月間活用できる英語学習サポートにより、最短での英語力向上を目指せます。
                                </p>

                            </div>
                        </div>
                        <div className="col-md-6">
                            <div>
                                <img src={chooseimg} style={{ width: '80%', height: '50%', marginLeft: 'auto', marginRight: 'auto', display: 'block', marginTop: '15%' }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='text-center'>
                <button className='btn choose-us-button'>スマ留についてもっと知る</button>
            </div>
        </div>
    );
};

export default ExternalChooseUs;