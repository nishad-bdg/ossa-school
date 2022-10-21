import React, { useRef, useState, useEffect } from 'react';
// Import Swiper React components
import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from '../../util/reactIntl';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { fetchSchool } from '../../ducks/user.duck';

import config from '../../config';
import {
  Page,
  SectionHero,
  SectionHowItWorks,
  Accordion,
  SectionSearchCarousel,
  SectionLocations,
  SectionCampaign,
  SectionRecommended,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalAbout,
  ExternalChatWithLine,
  ExternalPopularProgram,
  ExternalSearchCountry,
  ExternalSearchObject,
  ExternalSearchLanguage,
  ExternalRegiAndService,
  ExternalChooseUs,
  ExternalAskedQuestion,
  ExternalFooter,
  ExternalCampaign,
  ExternalSearchBox,
  SectionSearchCountry,
  SectionSearchPurpose,
  SectionSearchTheme,
  SectionNews,
  SectionAboutWarple,
  Section3Point,
  NamedLink,
  UserNav,
  ScrollToTop,
  Form,
} from '../../components';
import { StaticPage, TopbarContainer } from '../../containers';
import TopBanner from './TopBanner/TopBanner';
import AboutSection from './AboutSection/AboutSection';
import PointSection from './PointSection/PointSection';
import PinkBanner from './PinkBanner/PinkBanner';
import DocSection from './DocSection/DocSection';
import SearchSection from './SearchSection/SearchSection';
import SearchByCountry from './SearchByCountry/SearchByCountry';
import SearchByPurpose from './SearchByPurpose/SearchByPurpose';

// import required modules
import { Navigation, Pagination } from 'swiper';

import facebookImage from '../../assets/saunatimeFacebook-1200x630.jpg';
import twitterImage from '../../assets/saunatimeTwitter-600x314.jpg';
import css from './LandingPage.module.css';
import image from './city-demo.png';
import hatIcon from "./image/img/search-hat.svg";
import globalIcon from "./image/img/global.svg";
import flagIcon from "./image/img/flag.svg";
import docIcon from "./image/img/doc.svg";
import btnIcon from "./image/img/btn-icon.svg";
import locationIcon from "./image/img/tile-location.svg";
import {propTypes} from "../../util/types";
import { getConversionRate } from '../../util/currency.js';

export const LandingPageComponent = props => {
  const {
    history,
    intl,
    location,
    scrollingDisabled,
    isAuthenticated,
    filterConfig,
    fetchSchools,
  } = props;

  // Schema for search engines (helps them to understand what this page is about)
  // http://schema.org
  // We are using JSON-LD format
  const siteTitle = config.siteTitle;
  const schemaTitle = intl.formatMessage(
    { id: 'LandingPage.schemaTitle' },
    { siteTitle }
  );
  const schemaDescription = intl.formatMessage({
    id: 'LandingPage.schemaDescription',
  });
  const schemaImage = `${config.canonicalRootURL}${facebookImage}`;

  const [schools, setSchoolData] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);

    useEffect(() => {
		getConversionRate("../conversion_rate.json", (err, conversion) => {
		  if (err) {return;}
		  setConversionRate(conversion.current_date)
		});
		async function getSchool() {
			try {
				const data = await fetchSchools();
				let process_school_data = [];
				for (const school_data of data) {
				  if(typeof school_data.attributes != 'undefined' && typeof school_data.attributes.profile.publicData.country != 'undefined' && typeof school_data.attributes.profile.publicData.city != 'undefined'){
					if(typeof school_data.attributes.profile.publicData.schoolName != 'undefined'){
                       process_school_data.push(school_data);
					}
				  }
				}
				setSchoolData(process_school_data);
			} catch (err) {
			  console.log('Error occured when fetching schools');
			}
		}
		getSchool();
   }, []);

  return (
    <StaticPage
      className={css.root}
      scrollingDisabled={scrollingDisabled}
      contentType="website"
      description={schemaDescription}
      title={schemaTitle}
      facebookImages={[{ url: facebookImage, width: 1200, height: 630 }]}
      twitterImages={[
        {
          url: `${config.canonicalRootURL}${twitterImage}`,
          width: 600,
          height: 314,
        },
      ]}
      schema={{
        '@context': 'http://schema.org',
        '@type': 'WebPage',
        description: schemaDescription,
        name: schemaTitle,
        image: [schemaImage],
      }}
    >
      <LayoutSingleColumn className={css.mainPage}>
        <LayoutWrapperTopbar>
          <TopbarContainer />
          {isAuthenticated && <UserNav />}
        </LayoutWrapperTopbar>
        <LayoutWrapperMain>
          <div className={css.heroContainer}>
            <TopBanner />
            <div className={css.SecLocstion_postion}>
              <SectionLocations
                filterConfig={filterConfig}
                schools={schools}
              />
            </div>
          </div>
          <div className="top-slider" style={{ display: 'none' }}>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 50,
                },
              }}
              modules={[Navigation, Pagination]}
              className="mySwiper"
            >
              <SwiperSlide>Slide 1</SwiperSlide>
              <SwiperSlide>Slide 2</SwiperSlide>
              <SwiperSlide>Slide 3</SwiperSlide>
              <SwiperSlide>Slide 4</SwiperSlide>
              <SwiperSlide>Slide 5</SwiperSlide>
              <SwiperSlide>Slide 6</SwiperSlide>
              <SwiperSlide>Slide 7</SwiperSlide>
              <SwiperSlide>Slide 8</SwiperSlide>
              <SwiperSlide>Slide 9</SwiperSlide>
            </Swiper>
          </div>
          <div className={css.sectionContent}>
            <div className="custom-container">
              <div className="container">
                <AboutSection />
                <PointSection />
              </div>

              {/*<PinkBanner/> Pink banner module hde for PH1*/}

              <SearchSection
                conversionRate={conversionRate}
                schoolData={schools}
              />

              <div className="container-fluid">
                <div className="marquee">
                  <div className="track">
                    <span className="text -twox">LANGUAGE SCHOOL</span>
                    <span className="text -twox">LANGUAGE SCHOOL</span>
                    <span className="text -twox">LANGUAGE SCHOOL</span>
                    <span className="text -twox">LANGUAGE SCHOOL</span>
                  </div>
                </div>
              </div>

              <SearchByCountry />

              <div className="container-fluid">
                <div className="marquee">
                  <div className="track">
                    <span className="text -twox">COUNTRY</span>
                    <span className="text -twox">COUNTRY</span>
                    <span className="text -twox">COUNTRY</span>
                    <span className="text -twox">COUNTRY</span>
                  </div>
                </div>
              </div>

              <SearchByPurpose />

              <div className="container-fluid">
                <div className="marquee">
                  <div className="track">
                    <span className="text -twox">PURPOSE</span>
                    <span className="text -twox">PURPOSE</span>
                    <span className="text -twox">PURPOSE</span>
                    <span className="text -twox">PURPOSE</span>
                  </div>
                </div>
              </div>

              <DocSection />

              <div className="container-fluid">
                <div className="marquee">
                  <div className="track">
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                    <span className="text -twox">THEME</span>
                  </div>
                </div>
              </div>

              <div className="news-section">
                <div className="common-section">
                  <h1 className="common-title">NEWS</h1>
                  <p className="common-sub-title">お知らせ</p>

                  <div className="container padding50 news-card">
                    <div className="row row-cols-1 row-cols-md-3 g-3">
                      <div className="col custom-card">
                        <div className={css.cardArea}>
                          <div className={css.card}>
                            <div className={css.cardHeader}>
                              <img src={image} alt="City name" />
                            </div>
                            <div className={css.cardBody}>
                              <h4>2022.01.01</h4>
                              <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col custom-card">
                        <div className={css.cardArea}>
                          <div className={css.card}>
                            <div className={css.cardHeader}>
                              <img src={image} alt="City name" />
                            </div>
                            <div className={css.cardBody}>
                              <h4>2022.01.01</h4>
                              <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col custom-card">
                        <div className={css.cardArea}>
                          <div className={css.card}>
                            <div className={css.cardHeader}>
                              <img src={image} alt="City name" />
                            </div>
                            <div className={css.cardBody}>
                              <h4>2022.01.01</h4>
                              <p>
                                テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="common-btn-area">
                    <NamedLink name="NewsPage">
                      <button>
                        もっと見る{' '}
                        <img className="common-icon-btn" src={btnIcon} alt="" />
                      </button>
                    </NamedLink>
                  </div>
                </div>

                <div className="common-section faq-section">
                  <h1 className="common-title">FAQ</h1>
                  <p className="common-sub-title">よくある質問</p>

                  <div className="container">
                    <div className="news-section-content">
                      <Accordion
                        title="テキスト入りますテキスト入りますテキスト入ります"
                        content="テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります"
                      />
                      <Accordion
                        title="テキスト入りますテキスト入りますテキスト入ります"
                        content="テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります"
                      />
                      <Accordion
                        title="テキスト入りますテキスト入りますテキスト入ります"
                        content="テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります"
                      />
                      <Accordion
                        title="テキスト入りますテキスト入りますテキスト入ります"
                        content="テキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入りますテキスト入ります"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ScrollToTop />
        </LayoutWrapperMain>
        <LayoutWrapperFooter>
          {/* <ExternalFooter /> */}
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

const { bool, object } = PropTypes;

LandingPageComponent.defaultProps = {
  filterConfig: config.custom.filters[1],
};

LandingPageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  isAuthenticated: bool.isRequired,
  // from withRouter
  history: object.isRequired,
  location: object.isRequired,
  filterConfig: object.isRequired,
  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { isAuthenticated } = state.Auth;
  return {
    scrollingDisabled: isScrollingDisabled(state),
    isAuthenticated,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSchools: () => dispatch(fetchSchool()),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl
)(LandingPageComponent);

export default LandingPage;
