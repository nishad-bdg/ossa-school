import React from 'react';
import images from '../../../images/about.png';
import prevCampain from '../../../images/prev.png';
import nextCampain from '../../../images/next.png';
import './ExternalCampaign.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faSquareCaretRight } from '@fortawesome/free-solid-svg-icons';

const ExternalCampaign = () => {
    const slidesCampain = [
        {
            image: `url(${images})`,

        },
        {
            image: `url(${images})`,

        }
        , {
            image: `url(${images})`,

        },
        {
            image: `url(${images})`,

        },
        {
            image: `url(${images})`,

        },
    ];
    console.log(slidesCampain);

    const slideLeftCampain = () => {
        var slider = document.getElementById("sliderCampain");
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const slideRightCampain = () => {
        var slider = document.getElementById("sliderCampain");
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    return (
        <div className='text-center m-2'>
            <div className="container-fluid">
                <div className="popular-location-titleCampain">

                    <div className='popular-locationCampain '>
                        <h2 style={{ marginTop: '16px' }}>CAMPAIGN</h2>
                        <small>お得なキャンペーン情報</small>

                    </div>

                    <div>

                        <div id="sliderCampain">
                            {
                                slidesCampain.map((slideCampain, indexCampain) => {
                                    return (
                                        <div className="slider-cardCampain" key={indexCampain} onClick={() => slideCampain.clickEventCampain()}>
                                            <div className='' style={{ padding: '5px 10px' }}>
                                                <div className="slider-card-imageCampain" style={{ backgroundImage: slideCampain.image, backgroundSize: 'cover', borderRadius: '0' }}
                                                >

                                                </div>
                                            </div>


                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='prev-nextCampain'>
                            <div>
                                <FontAwesomeIcon style={{ marginRight: '30px', width: '40px', height: '40px' }} onClick={slideLeftCampain} src={prevCampain} icon={faSquareCaretLeft} />
                            </div>
                            <div>
                                <FontAwesomeIcon style={{ marginRight: '30px', width: '40px', height: '40px' }} onClick={slideRightCampain} src={prevCampain} icon={faSquareCaretRight} />
                            </div>





                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExternalCampaign;