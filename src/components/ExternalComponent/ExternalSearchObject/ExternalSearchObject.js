import React from 'react';
import images from '../../../images/ob.png';
import images1 from '../../../images/ob-2.png';
import images2 from '../../../images/ob-3.png';
import nextSearchObject from '../../../images/prev.png';
import prevSearchObject from '../../../images/next.png';
import './ExternalSearchObject.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

const ExternalSearchObject = () => {
    const slidesSearchObject = [
        {
            image: `url(${images})`,
            title: "短期留学",

        },
        {
            image: `url(${images1})`,
            title: "長期留学",

        }
        , {
            image: `url(${images2})`,
            title: "ワーキングホリデー",

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
    console.log(slidesSearchObject);

    const slideLeftSearchObject = () => {
        var slider = document.getElementById("sliderSearchObject");
        slider.scrollLeft = slider.scrollLeft + 870;
    }

    const slideRightSearchObject = () => {
        var slider = document.getElementById("sliderSearchObject");
        slider.scrollLeft = slider.scrollLeft - 870;
    }

    return (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
            <div className="container">
                <div className="popular-location-titleSearchObject">

                    <div className='popular-locationSearchObject'>
                        <h3 style={{ marginTop: '16px' }}><b>目的から探す</b></h3>

                    </div>

                    <div>

                        <div id="sliderSearchObject">
                            {
                                slidesSearchObject.map((slideSearchObject, indexSearchObject) => {
                                    return (
                                        <div className="slider-cardSearchObject" key={indexSearchObject} onClick={() => slideSearchObject.clickEvent()}>
                                            <div className='' style={{ padding: '5px 10px' }}>
                                                <div className="slider-card-imageSearchObject" style={{ backgroundImage: slideSearchObject.image, backgroundSize: 'cover', borderRadius: '0' }}
                                                >
                                                    <p className="slider-card-titleSearchObject text-center"><b>{slideSearchObject.title}</b></p>

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='prev-nextSearchObject'>
                            <FaLongArrowAltRight style={{ marginRight: '-64px', color: '#12CDD4', width: '40px', height: '40px', float: 'right', marginTop: '-130px' }} onClick={slideLeftSearchObject} />


                            <FaLongArrowAltLeft style={{ width: '40px', color: '#12CDD4', height: '40px', marginLeft: '-64px', marginTop: '-288px' }} onClick={slideRightSearchObject} />



                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalSearchObject;