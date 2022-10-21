import React, {useEffect, useMemo, useState} from 'react';
import config from '../../config';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { twitterPageURL } from '../../util/urlHelpers';
import {
  SectionHero,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
  Map, AreaMap, SectionLanguageSchool,
} from '../../components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { StaticPage, TopbarContainer } from '../../containers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCaretLeft, faStar, faUserGroup, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import unionWith from 'lodash/unionWith';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { manageDisableScrolling, isScrollingDisabled } from '../../ducks/UI.duck';
import css from './CityPage.module.css';
import './TopBanner.css'
import image from './city-demo.png';
import btnIcon from '../../containers/AboutUsPage/image/img/btn-icon.svg'

import data from '../../assets/json_data/city.json';
import { createPortal } from 'react-dom';
import HeadingText from './Custom/Heading/HeadingText';
import Slider from './Custom/Slider/Slider';
import school_data from "../../json_data/school_demo_data.json";
import countryjson from "../../json_data/country.json";
import { fetchSchoolData } from '../../ducks/user.duck';

const CityPageComponent = (props) => {

  const { fetchSchools } = props
  const { name } = props.params
  const { siteTwitterHandle, siteFacebookPage } = config;
  
  const [page, setPage] = useState(1);
  const [isShowMore, setIsShowMore] = useState(true);
  const [isDisplayed, setIsDisplayed] = useState(true);
  const [isSchoolDisplayed, setSchoolIsDisplayed] = useState(false);
  const [schools, setSchoolData] = useState([]);
  const [prevSchools, setPrevSchoolData] = useState([]);

  const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const city = useMemo(() => data.areas.find(area => area.area_name_en.replace(" ", "-").toLowerCase() === name.toLowerCase() ), [name])
  const popularCities = useMemo(() => data.areas.filter(area => !!area.popular_rate)?.shuffle()?.slice(0, 15) ?? [], [name])
  const schoolDataFilter = useMemo(() => school_data[city.country_code].filter(area => area.area_name_en.replace(" ", "-").toLowerCase() === name.toLowerCase())?.shuffle()?.slice(0, 15) ?? [], [name])

  useEffect(() => {
		const params = { page:page, pub_city:city.area_name_en }
		getSchool(params);
		setPage(page+1);
   }, []);
   
   const seeMoreHandleClick = () => {
      setPage(page+1);
	  const params = { page:page, pub_city:city.area_name_en }
      getSchool(params);
   }
   
    async function getSchool(params){
		try {
			console.log(params);
			const data =  await fetchSchools(params);
			console.log(data);
			let process_school_data = [];
			if(typeof data.data !== 'undefined' && data.data.length > 0){
				for (const school_data of data.data) {
				  if(typeof school_data.attributes != 'undefined' && typeof school_data.attributes.profile.publicData.country != 'undefined' && typeof school_data.attributes.profile.publicData.city != 'undefined'){
					if(typeof school_data.attributes.profile.publicData.schoolName != 'undefined'){
					   process_school_data.push(school_data);
					}
				  }
				}
			}
			setPrevSchoolData(prevSchools.concat(process_school_data));
			setSchoolData(prevSchools.concat(process_school_data));
			
			if(typeof data.meta !== 'undefined' && data.meta.page && data.meta.totalPages){
				if(data.meta.page === data.meta.totalPages){
					setIsShowMore(false);
				}
			}
		} catch (err) {
		  console.log('Error occured when fetching schools');
		}
	}

  return (
    <StaticPage
      title="City Page"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CityPage',
        description: 'About City',
        name: 'City Page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
          <div className='city-top-banner' style={{ backgroundImage: `url(${require(`../../assets/json_data/city_thumb/${city.thumbnail}`).default})` }}></div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain>
          <div className={css.section}>
            <div className={css.sectionContent}>
              <h1 className={css.pageTitle}>{city?.area_name_ja}</h1>
              <p className={css.cityContentMain}>
                {city?.discription}
              </p>
            </div>
          </div>

          <div className={css.staticPageWrapper}>
            {
              schools.length > 0?(
                <SectionLanguageSchool isShowMore={isShowMore} seeMoreHandleClick={seeMoreHandleClick} schoolData={schools} country_code={city.country_code}/>
              ):('')
            }


            {(isSchoolDisplayed)?(
            <div className="container">
              <div className={css.padding_top}>
                <h2 className={css.blue_text_p}>おすすめの語学学校</h2>
                <div className={css.pink_line}></div>
              </div>

              <div className='mb-4 mt-4'>
                <div className="container">
                  {props.listings.map(mainCity => (
                    <div className="row mb-4" key={mainCity.id.uuid}>
                      <div className={css.cardHorizontal}>
                        { (mainCity.images[0])? (
                          <img src={mainCity.images[0]?.attributes.variants["landscape-crop"].url} alt="City name" />
                        ):('') }
                        <div className={css.cardBodyHorizontal}>
                          <h4>
                            {mainCity?.attributes.title}
                          </h4>
                          <div className={css.subTitle}>
                            {mainCity?.attributes.title}
                          </div>
                          <div className="d-flex justify-content-between" style={{ flexWrap: 'wrap'}}>
                            <span className={css.mapLocation}><FontAwesomeIcon style={{color: '#1F36C7'}} icon={faLocationDot}/> {city?.area_name_en}, {city?.country_code}</span>
                            <span className={css.ratingArea}>
                                  <FontAwesomeIcon icon={faStar} style={{color: '#1F36C7'}} />
                                  <FontAwesomeIcon icon={faStar} style={{color: '#1F36C7'}} />
                                  <FontAwesomeIcon icon={faStar} style={{color: '#1F36C7'}} />
                                  <FontAwesomeIcon icon={faStar} style={{color: '#1F36C7'}} />
                                  <FontAwesomeIcon icon={faStar} style={{color: '#1F36C7'}} />
                                  <span className={css.rating}>4.5</span>
                                 {(mainCity.author.attributes.profile.displayName)?(
                                    <FontAwesomeIcon icon={faUserGroup} />
                                   ):''}
                                  {(mainCity.author.attributes.profile.displayName)?(
                                    <span className={css.userName}>{mainCity.author.attributes.profile.displayName}</span>
                                    ):''}
                                </span>

                            <span className={css.ratingCount}>24件</span>
                          </div>
                          <div className={css.mapLocation}>
                            {mainCity?.attributes.description}
                          </div>
                          <p className={css.currency}>
                            {mainCity.attributes.price?.amount} {mainCity.attributes.price?.currency}
                            {(mainCity.attributes.price)?(
                              <span> per night</span>
                            ):''}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))};
                </div>
              </div>
              <div className='text-center mt-4'>
                <button className={css.blue_btn}>シアトルのすべての学校を見る</button>
              </div>
            </div>
            ):('')
            }
          </div>

          <div className="container mb-4">
            {<AreaMap areaLayer={false} name={city.area_name_en} mapData={schools} lng={city.lang} lat={city.lat} zoom={9}/>}
          </div>
          <div>
              <div className={css.famous_city}>
                  <h2 className={css.blue_text_p}>他の人気都市</h2>
              </div>
            <Slider data={popularCities} />
          </div>

        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const mapStateToProps = state => {
  const {
    currentPageResultIds,
    pagination,
    searchInProgress,
    searchListingsError,
    searchParams,
    searchMapListingIds,
    activeListingId,
  } = state.SearchPage;
  const pageListings = getListingsById(state, currentPageResultIds);
  const mapListings = getListingsById(
    state,
    unionWith(currentPageResultIds, searchMapListingIds, (id1, id2) => id1.uuid === id2.uuid)
  );

  return {
    listings: pageListings,
    mapListings,
    pagination,
    scrollingDisabled: isScrollingDisabled(state),
    searchInProgress,
    searchListingsError,
    searchParams,
    activeListingId,
  };
};

const mapDispatchToProps = dispatch => ({
  onManageDisableScrolling: (componentId, disableScrolling) =>
    dispatch(manageDisableScrolling(componentId, disableScrolling)),
  onSearchMapListings: searchParams => dispatch(searchMapListings(searchParams)),
  onActivateListing: listingId => dispatch(setActiveListing(listingId)),
  fetchSchools: params => dispatch(fetchSchoolData(params)),
});

const CityPage = compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  injectIntl
)(CityPageComponent);

export default CityPage;