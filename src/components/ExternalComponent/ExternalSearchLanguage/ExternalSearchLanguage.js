import React from 'react';
import './ExternalSearchLanguage.css';
import images from '../../../images/l-1.png';
import images2 from '../../../images/l-2.png';
import images3 from '../../../images/l-3.png';
import nextSearchLanguage from '../../../images/prev.png';
import prevSearchLanguage from '../../../images/next.png';
// import './SearchLanguage.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

const ExternalSearchLanguage = () => {
    const slidesSearchLanguage = [
        {
            image: `url(${images})`,
            title: "TOEIC/TOEFL/IELTS対策",

        },
        {
            image: `url(${images2})`,
            title: "ビジネス英語",

        }
        , {
            image: `url(${images3})`,
            title: "マンツーマンレッスン",

        },
        {
            image: `url(${images})`,
            title: "this is a title",

        },
        {
            image: `url(${images})`,
            title: "this is a title",

        },
        {
            image: `url(${images})`,
            title: "this is a title",

        },
    ];
    console.log(slidesSearchLanguage);

    const slideLeftSearchLanguage = () => {
        var slider = document.getElementById("sliderSearchLanguage");
        slider.scrollLeft = slider.scrollLeft + 870;
    }

    const slideRightSearchLanguage = () => {
        var slider = document.getElementById("sliderSearchLanguage");
        slider.scrollLeft = slider.scrollLeft - 870;
    }
    return (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
            <div className="container">
                <div className="popular-location-titleSearchLanguage">

                    <div className='popular-locationSearchLanguage'>
                        <h3 style={{ marginTop: '16px' }}><b>学校の特徴・プログラムから探す</b></h3>

                    </div>

                    <div>

                        <div id="sliderSearchLanguage">
                            {
                                slidesSearchLanguage.map((slideSearchLanguage, indexSearchLanguage) => {
                                    return (
                                        <div className="slider-cardSearchLanguage" key={indexSearchLanguage} onClick={() => slideSearchLanguage.clickEvent()}>
                                            <div className='' style={{ padding: '5px 10px' }}>
                                                <div className="slider-card-imageSearchLanguage" style={{ backgroundImage: slideSearchLanguage.image, backgroundSize: 'cover', borderRadius: '0' }}
                                                >
                                                    <p className="slider-card-titleSearchLanguage text-center"><b>{slideSearchLanguage.title}</b></p>

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='prev-nextSearchLanguage'>
                            <FaLongArrowAltRight style={{ marginRight: '-64px', color: '#12CDD4', width: '40px', height: '40px', float: 'right', marginTop: '-130px' }} onClick={slideLeftSearchLanguage} />


                            <FaLongArrowAltLeft style={{ width: '40px', color: '#12CDD4', height: '40px', marginLeft: '-64px', marginTop: '-288px' }} onClick={slideRightSearchLanguage} />



                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalSearchLanguage;