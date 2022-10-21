import React from 'react';
import { faCartFlatbedSuitcase, faDisplay, faMedkit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
import './ExternalRegiAndService.css';
import servicebackground from '../../../images/services.jpg';

const ExternalRegiAndService = () => {
    return (
        <div style={{ backgroundImage: `url(${servicebackground})`, backgroundSize: 'cover', padding: '35px', marginTop: '30px', marginBottom: '40px' }}>
            <div className="container">
                <h2 className='text-center' style={{ color: 'white', marginBottom: '30px' }}><b>出発までの流れ</b></h2>

                <div className="row row-cols-1 row-cols-md-3 g-4">
                    <div className="col">
                        <div className="card h-100">
                            <FontAwesomeIcon icon={faDisplay} size="3x" style={{ paddingTop: '25px' }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">情報収集</h5>
                                <p className="card-text">自分に合った留学先や <br />
                                    料金プランのチェックをしよう</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <FontAwesomeIcon icon={faCartFlatbedSuitcase} size="3x" style={{ paddingTop: '25px' }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">申し込み</h5>
                                <p className="card-text">無料留学カウンセリングを活用 <br /> して、留学プランの申し込みを <br /> しよう</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card h-100">
                            <FontAwesomeIcon icon={faMedkit} size="3x" style={{ paddingTop: '25px' }} />
                            <div className="card-body text-center">
                                <h5 className="card-title">留学開始</h5>
                                <p className="card-text">利用者様を安心安全に留学して <br /> 頂くため365日、24時間の体制 <br /> でサポートします。</p>
                            </div>
                        </div>
                    </div>


                </div>
                <div className='text-center mt-4'>
                    <button className='btn regi-service-button'>詳しくはここをクリック</button>
                </div>
            </div>
        </div>
    );
};

export default ExternalRegiAndService;