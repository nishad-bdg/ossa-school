import React from 'react'
// import bigIcon from '../../../AboutUsPage/image/img/big-icon.svg'
import about from '../../../../images/about.png'
import './Slider.css';

const SliderCart = ({data}) => {
  return (
    <div className="slider">
      <a href={'/city/'+data.area_name_en.replace(" ", "-").toLowerCase()}>
          <h2>{data.area_name_en}</h2>
          {data.thumbnail ? <img src={require(`../../../../assets/json_data/city_thumb/${data.thumbnail}`).default} alt="City name" /> :
          <img src={about} alt="City name" />
          }
      </a>
    </div>
  )
}

export default SliderCart
