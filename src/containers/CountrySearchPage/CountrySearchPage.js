import React, { useState, useEffect } from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import school_data from '../../json_data/school_demo_data.json'
import { StaticPage, TopbarContainer } from '..';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  AreaMap,
  SectionCityList,
  SectionLanguageSchool,
  SectionSearchCountry,
  StudyAbroadSection
} from '../../components';
import { useParams, withRouter } from 'react-router-dom';
import css from './CountrySearchPage.module.css';
import './TopBanner.css'
import image from './about-us-1056.jpg';
import countryjson from '../../json_data/country.json'
import { fetchSchoolData } from '../../ducks/user.duck';
import { injectIntl } from 'react-intl';

const CountrySearchPageComponent = props => {

  const { fetchSchools, schoolList } = props
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);
  const { code } = useParams();
  const [page, setPage] = useState(1);
  const [isShowMore, setIsShowMore] = useState(true);
  const [country, setCountry] = useState(null);
  const [schools, setSchoolData] = useState([]);
  const [prevSchools, setPrevSchoolData] = useState([]);
  const banner = require(`../../images/country/${code}.jpg`).default;

    useEffect(() => {
		countryjson.map((countryData) => {
			if (countryData.country_code == code) {
				setCountry(countryData)
				const params = { page:page, pub_country:countryData.country_name_en }
		        getSchool(params);
				setPage(page+1);
			}
		});
   }, []);
   
   const seeMoreHandleClick = () => {
      setPage(page+1);
	  const params = { page:page, pub_country:country.country_name_en }
      getSchool(params);
   }
   
   async function getSchool(params){
			try {
				console.log(params);
				const data =  await fetchSchools(params);
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
   

  // prettier-ignore
  return (
    country &&
    <StaticPage
      title={country.country_name_ja}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'CountrySearchPage',
        description: 'Country Details',
        name: 'Country Details page',
      }}
    >
      <LayoutSingleColumn>
        <LayoutWrapperTopbar>
          <TopbarContainer />
          <div className='city-top-banner' style={{ backgroundImage: `url(${banner})` }}></div>
        </LayoutWrapperTopbar>

        <LayoutWrapperMain >
          <div className={css.staticPageWrapper}>
            <h1 className={css.pageTitle}>{country.country_name_ja}</h1>
            <div className={css.contentWrapper}>
              <div className='country-contentMain'>
                {country.description}
              </div>
            </div>
            <AreaMap areaLayer={true} name={country.country_name_en} code={country.country_code} mapData={schools} lng={country.lang} lat={country.lat} zoom={3}/>
            <SectionCityList country_code={country.country_code}/>
            <SectionLanguageSchool isShowMore={isShowMore} seeMoreHandleClick={seeMoreHandleClick} country_code={country.country_code} schoolData={schools}/>
            <SectionSearchCountry />
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
  const { isAuthenticated, loginError, signupError, confirmError } = state.Auth;
  const {
    schoolList,
  } = state.user;
  return {
    schoolList,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSchools: params => dispatch(fetchSchoolData(params)),
});

const CountrySearchPage = compose(
  withRouter,
  connect(mapStateToProps,mapDispatchToProps),
  injectIntl
)(CountrySearchPageComponent);

export default CountrySearchPage;