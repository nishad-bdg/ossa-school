import PropTypes, {array} from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';
import { getConversionRate } from '../../util/currency.js';
import css from './AreaMap.module.css';
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl';

mapboxgl.accessToken = window.mapboxgl.accessToken;

const AreaMap = props => {
  const { intl, areaLayer, name, code, mapData, lng, lat, zoom } = props;
  const title = intl.formatMessage({ id: 'AreaMap.title' });
  const mapContainer = useRef(null);
  const [conversionRate, setConversionRate] = useState(0);
  const map = useRef(null);
  const currencyText = intl.formatMessage({ id: 'SectionLanguageSchool.Price.Currency' });

  useEffect(() => {
	    getConversionRate("../conversion_rate.json", (err, conversion) => {
		  if (err) {return;}
		  setConversionRate(conversion.current_date)
		});
		if(lng && lat){
			initMap();
			if(areaLayer){
			  areaLayerSet();
			}
			if(mapData.length > 0){
			   schoolMarkerSet();
			}
		}
  }, [mapData]);

  const initMap = ()=>{
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v10',
        center: [lng, lat],
        zoom: zoom,
        scrollZoom: false,
      }, [props.list]);

    new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .setPopup(new mapboxgl.Popup({closeButton: false}).setHTML('<p>'+name+'</p>'))
      .addTo(map.current);

    var nav = new window.mapboxgl.NavigationControl({ showCompass: false });
    map.current.addControl(nav, 'top-left');
  }

  const areaLayerSet = ()=>{
    map.current.on('load', function() {
      map.current.addLayer({
        'id': 'countries',
        'source': {
          'type': 'vector',
          'url': 'mapbox://byfrost-articles.74qv0xp0'
        },
        'source-layer': 'ne_10m_admin_0_countries-76t9ly',
        'type': 'fill',
        'paint': {
          'fill-color': '#A7BED7',
          'fill-outline-color': '#1A35C9',
          'fill-opacity':0.6
        }
      });
      map.current.setFilter('countries', ['in', 'ADM0_A3_IS'].concat([code]));
    });
  }

  const schoolMarkerSet = ()=>{
    var bounds = new mapboxgl.LngLatBounds();
    let boundsEnable = false;
    for (const list of mapData) {
      var elMarker = document.createElement('div');
      elMarker.className = 'marker';
      let title,lat,lang,price,image = '';
	  if(typeof list.attributes != 'undefined'){
		  if(typeof list.attributes.profile.publicData != 'undefined'){
			  if(typeof list.attributes.profile.publicData.geolocation != 'undefined'){
				 if(typeof list.attributes.profile.publicData.geolocation.lat != 'undefined' && typeof list.attributes.profile.publicData.geolocation.lng != 'undefined'){

					  title = list.attributes.profile.publicData.schoolName;

					  price = 'Price not available';
					  if(typeof list.attributes.profile.publicData.price != 'undefined' && typeof list.attributes.profile.publicData.price.currency != 'undefined'){
						  price = list.attributes.profile.publicData.price.amount;
						  if(conversionRate){
							  price = price * conversionRate;
							  price = new Intl.NumberFormat("en", {
								currency: "JPY"
							  }).format(price);
							  price = '¥ '+price+' '+currencyText; 
						  }else{
							  price = '$ '+price; 
						  }
					  }
					  
					  lat = list.attributes.profile.publicData.geolocation.lat;
					  lang = list.attributes.profile.publicData.geolocation.lng;
					  let schoolImage = require(`../../json_data/school_thumb/school1.jpg`).default;
					  if(typeof list.attributes.profile.publicData.schoolPhotos != 'undefined'){
						  if(typeof list.attributes.profile.publicData.schoolPhotos.images != 'undefined'){
							 schoolImage = JSON.parse(list.attributes.profile.publicData.schoolPhotos.images)[0]['attributes']['variants']['default']['url'];
						  }
					  }
					  let school_details_url = '/u/'+list.id.uuid;
					  elMarker.innerHTML = '<div style="padding:10px 10px 10px 10px; background:#1A35C9; color:white;font-weight:bold;">'+price+'</div>';
					  const info_html = '<div style="width:200px; height: 220px"><a href="'+school_details_url+'" style="text-decoration: none; padding-top: 5px; color: #3C3C3C"><div style="width:200px; height: 190px"><img style="width:200px;height:190px" src="'+schoolImage+'" /></div><span style="font-weight:bold;color:#1A35C9">'+price+' </span> <span> '+title+'</span></a></div>';
					  new mapboxgl.Marker(elMarker)
						.setLngLat([lang, lat])
						.setPopup(new mapboxgl.Popup({closeButton: false})
						  .setHTML(info_html))
						.addTo(map.current);

					  bounds.extend([lang, lat]);
					  boundsEnable = true;
				 }
			 }
		  }
	  }
    }
    if(areaLayer && boundsEnable){
      map.current.fitBounds(bounds, {padding: 100});
    }
  }
  
  async function fetchConversionRate(currency){
	    await fetch(
		"https://v6.exchangerate-api.com/v6/23d52a73d4ca12e6c08cfb26/pair/"+currency+"/JPY")
		.then((res) => res.json())
		.then((json) => {
			setConversionRate(json.conversion_rate);
		}).catch((err) => {
		   console.log(err.message);
		});
   }

  return (
    <div className='text-center m-2 area-map area-map-main'>
      <div className="container-fluid mobile-container no-padding">
        <h2 className={css.sectionTitle}>AREA</h2>
        <h5 className={css.sectionSubTitle}>{title}</h5>
        <div className='position-relative'>
          <div ref={mapContainer} className={css.mapContainer} />
        </div>
      </div>
    </div>
  );
}

const { string, number } = PropTypes;

AreaMap.propTypes = {
  intl: intlShape.isRequired,
  lat: number,
  lng: number,
  code: string,
  zoom: number,
  mapData: array,
  name: string
};

export default injectIntl(AreaMap);


