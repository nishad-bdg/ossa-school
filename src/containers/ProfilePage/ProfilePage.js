import React, { Component } from 'react';
import Carousel from 'nuka-carousel';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import { REVIEW_TYPE_OF_PROVIDER, REVIEW_TYPE_OF_CUSTOMER, propTypes } from '../../util/types';
import { createSlug } from '../../util/urlHelpers';
import { obfuscatedCoordinates } from '../../util/maps';
import { types as sdkTypes } from '../../util/sdkLoader';
import { ensureCurrentUser, ensureSchool, ensureUser } from '../../util/data';
import { withViewport } from '../../util/contextHelpers';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { getMarketplaceEntities } from '../../ducks/marketplaceData.duck';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import {
  Page,
  LayoutWrapperMain,
  LayoutWrapperTopbar,
  LayoutWrapperFooter,
  Footer,
  AvatarLarge,
  NamedLink,
  ListingCard,
  Reviews,
  AreaMap,
  ButtonTabNavHorizontal, LayoutSingleColumn, SectionHero, LinkTabNavHorizontal, IconArrowHead, Map, IconCheckmark,
} from '../../components';
import CustomTabs from '../../components/CustomTabs/CustomTabs'
import { StaticPage, TopbarContainer, NotFoundPage } from '../../containers';
import config from '../../config';

import { dataFake } from './Data';

import css from './ProfilePage.module.css';

import IconLocation from '../../components/IconLocation/IconLocation';
import IconCurrency from '../../components/IconCurrency/IconCurrency';
import IconDate from '../../components/IconDate/IconDate';

/** sample assets */
import image from './city-demo.png';
import schoolCaption from './captionschool.png';
import photo1 from './photo1.png';
import photo2 from './photo2.png';
import photo3 from './photo3.png';
import photo4 from './photo4.png';
import IconArrow from '../../components/IconArrow/IconArrow';
import { findOptionsForSelectFilter } from '../../util/search';

const photosSchool = [].concat(photo1, photo2, photo3, photo4);

const { UUID, Money, LatLng } = sdkTypes;

const MAX_MOBILE_SCREEN_WIDTH = 768;
ChartJS.register(ArcElement, Tooltip, Legend);

export class ProfilePageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // keep track of which reviews tab to show in desktop viewport
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    };
    this.showOfProviderReviews = this.showOfProviderReviews.bind(this);
    this.showOfCustomerReviews = this.showOfCustomerReviews.bind(this);
  }

  showOfProviderReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_PROVIDER,
    });
  }

  showOfCustomerReviews() {
    this.setState({
      showReviewsType: REVIEW_TYPE_OF_CUSTOMER,
    });
  }

  render() {
    const {
      scrollingDisabled,
      currentUser,
      user,
      userShowError,
      params,
      queryListingsError,
      listings,
      reviews,
      schoolList,
      queryReviewsError,
      viewport,
      intl,
    } = this.props;
	
    const getUserTagsByGroup = (groupKeys, idGroup) => {
      return groupKeys?.reduce((arr, tagkey) => arr.concat(config.custom.filters.filter(v => v.id === idGroup).reduce((obj, item) => obj.concat(item.config.options), []).filter(v => v["key"] === tagkey)), [])?.map(v => v.label)
    }

    const ensuredCurrentUser = ensureCurrentUser(currentUser);
    const profileUser = ensureUser(user);
    const isCurrentUser =
      ensuredCurrentUser.id && profileUser.id && ensuredCurrentUser.id.uuid === profileUser.id.uuid;
    const displayName = profileUser.attributes.profile.displayName;
    const bio = profileUser.attributes.profile.bio;
    const hasBio = !!bio;
    const hasListings = listings.length > 0;
    const isMobileLayout = viewport.width < MAX_MOBILE_SCREEN_WIDTH;

    const schoolUser = ensureSchool(user);

    const { schoolPhotos, schoolName, description, tag, languagesSpokenByStaff, supportStaffName, messageFromTheStaff, addressLine1, country, city, location, address, schoolLocation, schoolFacilities, schoolActivities, topStudentNationalities, geolocation } = schoolUser?.attributes?.profile?.publicData;
    const hasMessageStaff = !!messageFromTheStaff;

    const schoolsFilteredByCountry = schoolList.length > 0 ? schoolList.filter(school => school.attributes.profile.publicData.city === city) : [];
    const addressMap = addressLine1 && addressLine1.selectedPlace ? addressLine1.selectedPlace.address : '';
    const origin = addressLine1 && addressLine1.selectedPlace.origin ? addressLine1.selectedPlace.origin : '';
    const latNumber = geolocation && geolocation.lat ? geolocation.lat : 0;
    const lngNumber = geolocation && geolocation.lng ? geolocation.lng : 0;

    const cacheKey = schoolUser.id ? `${schoolUser.id.uui}_${origin.lat}_${origin.lng}` : null;
    
    const mapProps = config.maps.fuzzy.enabled
      ? { obfuscatedCenter: obfuscatedCoordinates(origin, cacheKey) }
      : { address: addressMap, center: new LatLng(latNumber, lngNumber), zoom: 9 };

    /** Tabs */
    const tabSchoolScale = intl.formatMessage({ id: 'ProfilePage.tab1Label' });
    const tabSchoolFacilities = intl.formatMessage({ id: 'ProfilePage.tab2Label' });
    const tabNationalityRatio = intl.formatMessage({ id: 'ProfilePage.tab3Label' });
    const tabActivities = intl.formatMessage({ id: 'ProfilePage.tab4Label' });

    const sfOptions = findOptionsForSelectFilter('schoolFacilities', config.custom.filters);
    const saOptions = findOptionsForSelectFilter('schoolActivities', config.custom.filters);


    const locationSchool = addressLine1?.selectedPlace?.address;
    const featureTags = tag?.features?.tags;
    const studyAbroadTags = tag?.studyabroad?.tags;
    const programTags = tag?.programs?.tags;

    /** Tags labels by group name */
    const studyAbroadTagsUser = getUserTagsByGroup(studyAbroadTags, 'studyabroad');
    const featureTagsUser = getUserTagsByGroup(featureTags, 'features_tags');
    const programTagsUser = getUserTagsByGroup(programTags, 'programs_tags');

    /** Total tags labels user */
    const userAllTags = [].concat(studyAbroadTagsUser, featureTagsUser, programTagsUser);
    let allSchoolImageList = [];
    let schoolImage = require(`../../json_data/school_thumb/school1.jpg`).default;
    if(typeof schoolPhotos != 'undefined'){
      if(typeof schoolPhotos.images != 'undefined') {
        schoolImage = JSON.parse(schoolPhotos.images)[0]['attributes']['variants']['default']['url'];
        let schoolImageList = JSON.parse(schoolPhotos.images);
		for (let i = 0; i < schoolImageList.length; i += 4) {
			const chunk = schoolImageList.slice(i, i + 4);
			allSchoolImageList.push(chunk);
		}
      }
    }
	
	let mapData = [];
	mapData.push(schoolUser);
	
    const optionsPie = {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true
          }
        }
      }
    }

    const dataStudents = {
      labels: topStudentNationalities && topStudentNationalities.reduce((labelsOut, v) => labelsOut.concat(v.nationality), []),
      datasets: [{
        label: 'Nationalities Pie',
        data: topStudentNationalities && topStudentNationalities.map(nat => nat.numberOfPeople),
        backgroundColor: [
          '#d1362b',
          '#4a7db3',
          '#67ad57',
          '#ef8632'
        ],
        hoverOffset: 4,
      }]
    };;

    const editLinkMobile = isCurrentUser ? (
      <NamedLink className={css.editLinkMobile} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkMobile" />
      </NamedLink>
    ) : null;
    const editLinkDesktop = isCurrentUser ? (
      <NamedLink className={css.editLinkDesktop} name="ProfileSettingsPage">
        <FormattedMessage id="ProfilePage.editProfileLinkDesktop" />
      </NamedLink>
    ) : null;

    const asideContent = (
      <div className={css.asideContent}>
        <AvatarLarge className={css.avatar} user={user} disableProfileLink />
        <h1 className={css.mobileHeading}>
          {displayName ? (
            <FormattedMessage id="ProfilePage.mobileHeading" values={{ name: displayName }} />
          ) : null}
        </h1>
        {editLinkMobile}
        {editLinkDesktop}
      </div>
    );

    const listingsContainerClasses = classNames(css.listingsContainer, {
      [css.withBioMissingAbove]: !hasBio,
    });

    const reviewsError = (
      <p className={css.error}>
        <FormattedMessage id="ProfilePage.loadingReviewsFailed" />
      </p>
    );

    const reviewsOfProvider = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_PROVIDER);

    const reviewsOfCustomer = reviews.filter(r => r.attributes.type === REVIEW_TYPE_OF_CUSTOMER);

    const mobileReviews = (
      <div className={css.mobileReviews}>
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfProviderTitle"
            values={{ count: reviewsOfProvider.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfProvider} />
        <h2 className={css.mobileReviewsTitle}>
          <FormattedMessage
            id="ProfilePage.reviewsOfCustomerTitle"
            values={{ count: reviewsOfCustomer.length }}
          />
        </h2>
        {queryReviewsError ? reviewsError : null}
        <Reviews reviews={reviewsOfCustomer} />
      </div>
    );

    const desktopReviewTabs = [
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfProviderTitle"
              values={{ count: reviewsOfProvider.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER,
        onClick: this.showOfProviderReviews,
      },
      {
        text: (
          <h3 className={css.desktopReviewsTitle}>
            <FormattedMessage
              id="ProfilePage.reviewsOfCustomerTitle"
              values={{ count: reviewsOfCustomer.length }}
            />
          </h3>
        ),
        selected: this.state.showReviewsType === REVIEW_TYPE_OF_CUSTOMER,
        onClick: this.showOfCustomerReviews,
      },
    ];

    const desktopReviews = (
      <div className={css.desktopReviews}>
        <ButtonTabNavHorizontal className={css.desktopReviewsTabNav} tabs={desktopReviewTabs} />

        {queryReviewsError ? reviewsError : null}

        {this.state.showReviewsType === REVIEW_TYPE_OF_PROVIDER ? (
          <Reviews reviews={reviewsOfProvider} />
        ) : (
          <Reviews reviews={reviewsOfCustomer} />
        )}
      </div>
    );

    const mainContent = (
      <div>
        <h1 className={css.desktopHeading}>
          <FormattedMessage id="ProfilePage.desktopHeading" values={{ name: displayName }} />
        </h1>
        {hasBio ? <p className={css.bio}>{bio}</p> : null}

        {isMobileLayout ? mobileReviews : desktopReviews}
      </div>
    );

    let content;

    if (userShowError && userShowError.status === 404) {
      return <NotFoundPage />;
    } else if (userShowError || queryListingsError) {
      content = (
        <p className={css.error}>
          <FormattedMessage id="ProfilePage.loadingDataFailed" />
        </p>
      );
    } else {
      content = mainContent;
    }

    const schemaTitle = intl.formatMessage(
      {
        id: 'ProfilePage.schemaTitle',
      },
      {
        name: displayName,
        siteTitle: config.siteTitle,
      }
    );

    return (
      <StaticPage
        scrollingDisabled={scrollingDisabled}
        title={schemaTitle}
        schema={{
          '@context': 'http://schema.org',
          '@type': 'ProfilePage',
          name: schemaTitle,
        }}
      >
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.contentHeader}>
              <div className={css.sectionHero}>
                <div className={css.cardWrapper}>
                  <img src={schoolImage} alt={schoolName} />
                  <div className={css.bodyCard}>
                    <div className={css.titleSchool}>
                      <h1>{schoolName}<span className={css.decorator}></span></h1>
                    </div>
                    <div className={css.infoHold}>
                      <div className={css.subTitle}>{schoolName}</div>
                      <div className={css.desc}><p className="ellipsis-1-lines">{description}</p></div>
                      <div className={css.lineInfo}>
                        <span>{schoolLocation}</span>
                      </div>
                      <div className={css.location}>
                        <IconLocation className={css.icon} />
                        {/*<FormattedMessage id="ProfilePage.locationSchool" values={{ location: locationSchool }} />*/}
                        {location?.address}
                      </div>
                      <div className={css.langs}>
                        <span><FormattedMessage id="ProfilePage.languageslabel" /></span>
                        {
                          languagesSpokenByStaff
                            ?.map((lang, i) => <span className={css.langItem} key={i}>{lang}</span>)
                        }
                      </div>
                      <div className={css.tagsCloud}>
                        {
                          userAllTags.map((v, i) => {
							if(v){
								return (
								  <div className={css.tagItem} key={i}>{v}</div>
								)
							}else{
								return ('')
							}  
                          })
                        }
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className={css.contentWrapper}>
              <div className={css.section}>
                <div className={css.userWrapper}>
                  <div className={css.cardUser}>
                    <AvatarLarge className={css.userAvatar} user={user} disableProfileLink />
                    <div className={css.userContent}>
                      <h4>{supportStaffName}</h4>
                      {hasMessageStaff ? <p className={css.userBio}>{messageFromTheStaff}</p> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className={css.section}>
                {hasListings ? (
                  <>
                    <h2>
                      <FormattedMessage
                        id="ProfilePage.courseTitle"
                        values={{ name: schoolName }}
                      />
                    </h2>
                    <ul className={css.listings}>
                      {listings.map(l => (
                        <li className={css.itemCourse} key={l.id.uuid}>
                          <NamedLink name="ListingPage" params={{ id: l.id.uuid, slug: createSlug(l.attributes.title) }}>
                            <div className={css.cardFlat}>
                              <h2 className={css.title}>{l.attributes.title}</h2>
                              <div className={css.cardContent}>
                                <FormattedMessage id="ProfilePage.levelCourse" values={{ level: l.attributes.publicData.requiredLevel }} />
                                <span className={css.duration}>
                                  {
                                    l.attributes.publicData.minDuration && l.attributes.publicData.maxDuration && l.attributes.publicData.lessionDuration && (<>
                                      <IconDate className={css.icon} />
                                      <FormattedMessage
                                        id="ProfilePage.courseDuration" values={{ count: `${l.attributes.publicData.minDuration} ~ ${l.attributes.publicData.maxDuration}` }} />
                                      <FormattedMessage
                                        id="ProfilePage.lessonDuration" values={{ lessons: l.attributes.publicData.lessionDuration }} /></>)
                                  }
                                </span>
                                <span className={css.price}>
                                  {
                                    l.attributes.price !== null && l.attributes.price.amount &&
                                    (<>
                                      <IconCurrency className={css.icon} />
                                      <FormattedMessage
                                        id="ProfilePage.price" values={{ price: l.attributes.price.amount }} />
                                    </>)
                                  }
                                </span>
                              </div>
                            </div>
                          </NamedLink>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
              </div>
			  {
			   (allSchoolImageList.length > 0)?(
              <div className={css.section}>
                <h2><FormattedMessage
                  id="ProfilePage.schoolHighLights"
                /></h2>
                <div className={css.sliderImages}>
                  <Carousel
                    cellAlign="center"
                    renderBottomCenterControls={({ currentSlide, slideCount }) => (
                      <span>{currentSlide + 1} / {slideCount}</span>
                    )}
                    renderCenterLeftControls={({ previousSlide, currentSlide }) => (
                      <button onClick={previousSlide} className={classNames(css.arrowPrev, currentSlide + 1 == 1 && css.arrowDisable)}>
                        <IconArrow />
                      </button>
                    )}
                    renderCenterRightControls={({ nextSlide, currentSlide, slideCount }) => (
                      <button onClick={nextSlide} className={classNames(css.arrowNext, currentSlide + 1 == slideCount && css.arrowDisable)}>
                        <IconArrow />
                      </button>
                    )}
                  >
                    {
                      allSchoolImageList.length > 0 && allSchoolImageList.map((schoolImageListSlider, i) => {
                        return <div className={css.slide} key={i}>
                          {
                            schoolImageListSlider.map((item, i) => {
                              let schoolImageName = item['attributes']['variants']['default']['url'];
                              return <img src={schoolImageName} alt={`photo${i}`} key={i} />
                            })
                          }
                        </div>
                      })
                    }
                  </Carousel>
                </div>

              </div>
			  ):('')
			  }
              <div className={css.section}>
                <div className={css.mapWrapper}>
                  <h2><FormattedMessage
                    id="ProfilePage.mapTitle"
                  /></h2>
				  <AreaMap conversionRate={0} areaLayer={false} name={city} mapData={mapData} lng={lngNumber} lat={latNumber} zoom={9}/>
                </div>
              </div>
              <div className={css.section}>
                <div className={css.tabsWrapper}>
                  <h2><FormattedMessage
                    id="ProfilePage.basicInfo"
                  /></h2>
                  <CustomTabs className={css.tabWrapper}>
                    <div label={tabSchoolScale}>
                      <ul className={css.listOptions}>
                        {
                          dataFake && dataFake.options.map((option) => {
                            return (<li className={css.listItem}>
                              <span className={css.label}>{option.label}</span>
                              <span className={css.info}>{option.value}</span>
                            </li>)
                          })
                        }
                      </ul>
                    </div>
                    <div label={tabSchoolFacilities}>
                      <ul className={css.optionChecks}>
                        {
                          sfOptions.map((option, i) => {
                            return schoolFacilities && schoolFacilities.includes(option.key) ? (
                              <li className={css.listOption} key={i}><IconCheckmark style="red" className={css.iconRedCheck} size={''} />{option.label}</li>
                            ) : (<li className={classNames(css.listOption, css.disabled)} key={i}>{option.label}</li>)
                          })
                        }
                      </ul>
                    </div>
                    <div label={tabNationalityRatio}>
                      <div className={css.pieContainer}>
                        <Pie options={optionsPie} data={dataStudents} />
                      </div>
                    </div>
                    <div label={tabActivities}>
                      <div className={css.listSection}>
                        <ul className={css.optionChecks}>
                          {
                            saOptions.map((option, i) => {
                              return schoolActivities && schoolActivities.includes(option.key) ? (
                                <li className={css.listOption} key={i}><IconCheckmark style="red" className={css.iconRedCheck} size={''} />{option.label}</li>
                              ) : (<li className={classNames(css.listOption, css.disabled)} key={i}>{option.label}</li>)
                            })
                          }
                        </ul>
                      </div>
                    </div>
                  </CustomTabs>
                </div>
              </div>
              <div className={css.section}>
                <div className={css.schoolsWrapper}>
                  <h2><FormattedMessage
                    id="ProfilePage.schoolsRelated" /></h2>
                  <div className={css.schoolItems}>
                    {
                        schoolsFilteredByCountry.length > 0 && schoolsFilteredByCountry.map(school => {

						    if(typeof school.attributes.profile.publicData != 'undefined'){
								const { schoolName: name, schoolPhotos } = school.attributes.profile.publicData;

								let cityWiseSchoolImage = require(`../../json_data/school_thumb/school1.jpg`).default;
								if(typeof schoolPhotos != 'undefined'){
								  if(typeof schoolPhotos.images != 'undefined') {
									cityWiseSchoolImage = JSON.parse(schoolPhotos.images)[0]['attributes']['variants']['default']['url'];
								  }
								}
								return (
								  <NamedLink name="ProfilePage" params={{ id: school.id.uuid, slug: createSlug(name ? name : '') }}>
									<div className={css.cardItem}>
									  <img src={cityWiseSchoolImage} alt={schoolName} className={css.caption} />
									  <div className={css.cardContent}>
										<div className={css.schoolRelatedTitle}>{name}</div>
									  </div>
									</div>
								  </NamedLink>
								)
							}
                        })
                    }
                  </div>

                </div>
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </StaticPage >
    );
  }
}

ProfilePageComponent.defaultProps = {
  currentUser: null,
  user: null,
  userShowError: null,
  queryListingsError: null,
  reviews: [],
  queryReviewsError: null,
};

const { bool, arrayOf, number, shape } = PropTypes;

ProfilePageComponent.propTypes = {
  scrollingDisabled: bool.isRequired,
  currentUser: propTypes.currentUser,
  user: propTypes.user,
  userShowError: propTypes.error,
  queryListingsError: propTypes.error,
  listings: arrayOf(propTypes.listing).isRequired,
  reviews: arrayOf(propTypes.review),
  queryReviewsError: propTypes.error,

  // form withViewport
  viewport: shape({
    width: number.isRequired,
    height: number.isRequired,
  }).isRequired,

  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser, schoolList } = state.user;
  const {
    userId,
    userShowError,
    queryListingsError,
    userListingRefs,
    reviews,
    queryReviewsError,
  } = state.ProfilePage;
  const userMatches = getMarketplaceEntities(state, [{ type: 'user', id: userId }]);
  const user = userMatches.length === 1 ? userMatches[0] : null;
  const listings = getMarketplaceEntities(state, userListingRefs);
  return {
    scrollingDisabled: isScrollingDisabled(state),
    currentUser,
    user,
    userShowError,
    queryListingsError,
    listings,
    schoolList,
    reviews,
    queryReviewsError
  };
};

const ProfilePage = compose(
  connect(mapStateToProps),
  withViewport,
  injectIntl
)(ProfilePageComponent);

export default ProfilePage;
