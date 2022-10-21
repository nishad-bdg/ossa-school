import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React from 'react';
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import logo from '../../../images/logo.png';
import qr from '../../../images/qr.png';
import chat from '../../../images/chat.png';
import { Link } from 'react-router-dom';

const ExternalFooter = () => {
    return (
        <div className='mt-3'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className='d-flex'>
                            <div>
                                <Link to={"/"}><img src={logo} alt="" />
                                </Link>                                 <p style={{ color: '#16A0B8' }}>語学留学・海外留学エージェントのスマ留</p>
                                <p className='text-center'>&copy; sharetribe</p>
                            </div>
                            <div style={{ marginLeft: 'auto', marginTop: '22px' }}>
                                <p>留学先を探す</p>
                                <p>お得なキャンペーン</p>
                                <p>スマ留について</p>
                                <p>あなたに合ったプランを探す</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className='d-flex'>
                            <div style={{ margin: 'auto' }}>
                                <p>プライバシーポリシー</p>
                                <p>プライバシーポリシー</p>
                                <p>プライバシーポリシー</p>
                            </div>
                            <div style={{ marginLeft: 'auto', marginTop: '42px' }}>
                                <div>
                                    <FaFacebookF />
                                    <FaTwitter />
                                </div>
                                <div>
                                    <img style={{ marginTop: '40px' }} src={qr} alt="" />
                                </div>
                            </div>
                            <div>
                                <img src={chat} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalFooter;