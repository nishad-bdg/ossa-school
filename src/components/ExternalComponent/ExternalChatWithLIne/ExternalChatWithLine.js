import React from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ExternalChatWithLine.css';
const ExternalChatWithLine = () => {
    return (
        <div className='mb-4 mt-4'>
            <div className="container">
                <div className="row" style={{ backgroundColor: '#DEDEDE', padding: '20px' }}>

                    <div className="col-md-6">
                        <div className='text-center' style={{ borderRight: '3px solid black' }}>
                            <h6>\もっと気軽に/</h6>
                            <h2>ELINE LINEで留学相談</h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='text-center'>
                            <h6>もっと気軽にLINEで留学相談してみよう!</h6>
                            <h6>LINEでもお問い合わせ受付中。</h6>
                            <h6>どんな事でも気軽に相談､ 留学経験者が対応。</h6>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className='text-center mt-3'>
                            <button className='btn chat-with-line-btn'>LINEで留学相談してみる<FontAwesomeIcon icon={faArrowRight} /></button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ExternalChatWithLine;