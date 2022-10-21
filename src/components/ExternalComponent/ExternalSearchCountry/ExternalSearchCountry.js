import React from 'react';
// import React from 'react';
import images from '../../../images/sc-1.png';
import images2 from '../../../images/sc-2.png';
import images3 from '../../../images/sc-3.png';
import nextSearchCountry from '../../../images/prev.png';
import prevSearchCountry from '../../../images/next.png';
import './ExternalSearchCountry.css';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

const ExternalSearchCountry = () => {

    const slider = () => {
        console.log("click korci");
    }

    const slidesSearchCountry = [
        {
            image: `url(${images})`,
            title: "アメリカ",
            clickEvent: slider,

        },
        {
            image: `url(${images2})`,
            title: "マルタ",
            clickEvent: slider,
        }
        , {
            image: `url(${images3})`,
            title: "フィリピン",
            clickEvent: slider,
        },
        {
            image: `url(${images})`,
            title: "this is a title",
            clickEvent: slider,
        },
        {
            image: `url(${images})`,
            title: "this is a title",
            clickEvent: slider,
        },
        {
            image: `url(${images})`,
            title: "this is a title",
            clickEvent: slider,
        },
    ];
    console.log(slidesSearchCountry);



    const slideLeftSearchCountry = () => {
        var slider = document.getElementById("sliderSearchCountry");
        slider.scrollLeft = slider.scrollLeft + 870;
    }

    const slideRightSearchCountry = () => {
        var slider = document.getElementById("sliderSearchCountry");
        slider.scrollLeft = slider.scrollLeft - 870;
    }


    return (
        <div style={{ marginTop: '30px', marginBottom: '30px' }}>
            <div className="container">
                <div className="popular-location-titleSearchCountry">

                    <div className='popular-locationSearchCountry'>
                        <h3 style={{ marginTop: '16px' }}><b>国エリアから探す</b></h3>

                    </div>

                    <div>

                        <div id="sliderSearchCountry">
                            {
                                slidesSearchCountry.map((slideSearchCountry, indexSearchCountry) => {
                                    return (
                                        <div className="slider-cardSearchCountry" key={indexSearchCountry} onClick={() => slideSearchCountry.clickEvent()}>
                                            <div className='' style={{ padding: '5px 10px' }}>
                                                <div className="slider-card-imageSearchCountry" style={{ backgroundImage: slideSearchCountry.image, backgroundSize: 'cover', borderRadius: '0' }}
                                                >
                                                    <p className="slider-card-titleSearchCountry text-center"><b>{slideSearchCountry.title}</b></p>

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='prev-nextSearchCountry'>
                            <FaLongArrowAltRight style={{ marginRight: '-64px', color: '#12CDD4', width: '40px', height: '40px', float: 'right', marginTop: '-130px' }} onClick={slideLeftSearchCountry} />


                            <FaLongArrowAltLeft style={{ width: '40px', height: '40px', color: '#12CDD4', marginLeft: '-64px', marginTop: '-288px' }} onClick={slideRightSearchCountry} />



                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalSearchCountry;