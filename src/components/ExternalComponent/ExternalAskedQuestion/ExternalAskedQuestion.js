import React from 'react';
import './ExternalAskedQuestion.css';

const ExternalAskedQuestion = () => {
    return (
        <div style={{ backgroundColor: '#F8F8F8', padding: '30px', marginTop: '30px', marginBottom: '50px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div>
                            <h2>よくある質問</h2>
                            <p>はじめての留学ではわからないことがあるのは誰でも同じ。準備段階 <br /> から帰国後まで、留学に関するよくある疑問や質問をご紹介します。<br /> 不安を解消してスムーズに準備を始めましょう。</p>
                        </div>
                        <p>準備について</p>
                        <div>
                            <div className="accordion accordion-flush" id="accordionFlushExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                            英語が苦手なのですが、留学出来るでしょうか？
                                        </button>
                                    </h2>
                                    <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item's accordion body.</div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                                            留学の準備はどのくらい前から始めたら良いですか？
                                        </button>
                                    </h2>
                                    <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="flush-headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                                            初めに何をしたらいいのでしょうか？
                                        </button>
                                    </h2>
                                    <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                                        <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='text-center'>
                            <button className='btn asked-button-1'>お問い合わせ</button> <br />
                            <button className='btn asked-button-2'>資料をダウンロードする</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalAskedQuestion;