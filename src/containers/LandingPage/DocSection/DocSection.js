import React, { Component } from 'react'
import './DocSection.css'
import docIcon from "../image/img/doc.svg";
import image from "../city-demo.png";
import btnIcon from "../image/img/btn-icon.svg";

export default class DocSection extends Component {
  render() {
    return (
      <div className="common-section doc-section">
        <div className="main-container">
          <div className="text-with-image"><img src={docIcon} alt="Doc" />テーマからさがす</div>
          <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-1">
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card">
                  <div className="cardHeader">
                    <img src={image} alt="City name" />
                  </div>
                  <div className="cardBody">
                    <h4>
                      Natural
                    </h4>
                    <img className='common-icon-btn' src={btnIcon} alt="" />
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
