import React, { Component } from 'react'
import vectorImg from '../image/img/vector-one.svg'
import btnIcon from '../image/img/btn-icon.svg'
import image from '../image/img/city-demo.png';
import './SecContainer.css'

export default class SecContainer extends Component {
  render() {
    return (
        <div className='sec-container'>
        <h1 className='sec-container-heading'>News</h1>        
            <div className='sec-container-div'>
                <div className="container padding50 news-card">
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                        <div className="col">
                        <div className="cardArea">
                            <div className="card">
                            <div className="cardHeader">
                                <img src={image} alt="City name" />
                            </div>
                            <div className="cardBody">
                                <h4>
                                2022.01.01
                                </h4>
                                <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col">
                        <div className="cardArea">
                            <div className="card">
                            <div className="cardHeader">
                                <img src={image} alt="City name" />
                            </div>
                            <div className="cardBody">
                                <h4>
                                2022.01.01
                                </h4>
                                <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="col">
                        <div className="cardArea">
                            <div className="card">
                            <div className="cardHeader">
                                <img src={image} alt="City name" />
                            </div>
                            <div className="cardBody">
                                <h4>
                                2022.01.01
                                </h4>
                                <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                                </p>
                            </div>
                            </div>
                        </div>
                        </div>            
                    </div>
                </div>             
            </div>            
    </div>
    )
  }
}
