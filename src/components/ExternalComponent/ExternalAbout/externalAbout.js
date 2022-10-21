import React from 'react';
import aboutimg from '../../../images/about.png';

const externalAbout = () => {
    return (
        <div style={{ marginTop: '30px' }}>
            <div className="container">
                <div className='text-center mb-3'>
                    <h2>ABOUT SMARYU</h2>
                    <small>スマ留について</small>

                </div>
                <div className='d-flex justify-content-center'>
                    <div className="card" style={{ width: '18rem' }}>
                        <img src={aboutimg} className="card-img-top" alt="..." />

                    </div>
                </div>

            </div>
        </div>
    );
};

export default externalAbout;