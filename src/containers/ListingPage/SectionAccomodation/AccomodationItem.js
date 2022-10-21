import React, { Component }from 'react'
import { FormattedMessage } from '../../../util/reactIntl';
import css from './SectionAccomodation.module.css'
import config from '../../../config';
import { findOptionsForSelectFilter } from '../../../util/search';
import {
  formatMoney,
  unitDivisor,
  convertUnitToSubUnit,
} from '../../../util/currency';
import { types as sdkTypes } from '../../../util/sdkLoader';

const { Money } = sdkTypes;

const broadTypeOptions = findOptionsForSelectFilter('broadType', config.custom.filters);
const roomTypeOptions = findOptionsForSelectFilter('roomType', config.custom.filters);
const howMuchTimeOptions = findOptionsForSelectFilter('howMuchTime', config.custom.filters);
const howToMoveOptions = findOptionsForSelectFilter('howToMove', config.custom.filters);
const priceData = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTitle: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const priceData2 = (price, intl) => {
  if (price && price.currency === config.currency) {
    const formattedHighPrice = formatMoney(intl, price);
    return { formattedHighPrice, priceTitle: formattedHighPrice };
  } else if (price) {
    return {
      formattedHighPrice: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTitle: intl.formatMessage(
        { id: 'ManageAccomodationCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};
class AccomodationItem extends Component {
  constructor(props) {
    super(props);
    this.state = {images: []};
  }

  componentDidMount() {
    this.setState({
      images: JSON.parse(this.props.accomodation.images)
    });
  }
  
  render() {
  const { accomodation, intl, listingSchool } = this.props;
  this.componentDidMount

  const returnConfigData = (configArray, key) => {
    const returnData = configArray.find(element => element.key == key)
    return returnData && returnData?.label
  }
  let price = null
  if (accomodation?.pricing && accomodation?.pricing?.normal_season?.amount) {
    price = new Money(
      convertUnitToSubUnit(accomodation?.pricing?.normal_season?.amount / 100, unitDivisor(accomodation?.pricing?.normal_season?.currency)),
      accomodation?.pricing?.normal_season?.currency
    );
  }

  const { formattedPrice, priceTitle } = priceData(price, intl);

  let highPrice = null
  if (accomodation?.pricing && accomodation?.pricing?.high_season?.amount) {
    highPrice = new Money(
      convertUnitToSubUnit(accomodation?.pricing?.high_season?.amount / 100, unitDivisor(accomodation?.pricing?.high_season?.currency)),
      accomodation?.pricing?.high_season?.currency
    );
  }

  const { formattedHighPrice, highPriceTitle } = priceData2(highPrice, intl);
  return (
    <>
      <div className={css.img_div}>
        {
          this.state.images.length > 0 ? this.state.images.map(image => <img src={image.attributes.variants.default.url} alt="" />) : null
        }
        
      </div>
      <div className={css.table_text_div}>
        <h2>{accomodation?.description?.title}</h2>
        <div className={css.table_text_single_div}>
            <div className={css.table_text}>
                <div className={css.title}>{intl.formatMessage({ id: 'AccomodationItem.roomTypeLabel' })}</div>
                <div className={css.details}>{returnConfigData(roomTypeOptions, accomodation?.type?.roomType)}</div>
            </div>
            <div className={css.table_text}>
                <div className={css.title}>{intl.formatMessage({ id: 'AccomodationItem.mealTypeLabel' })}</div>
                <div className={css.details}>{returnConfigData(broadTypeOptions, accomodation?.type?.broadType)}</div>
            </div>
            <div className={css.table_text}>
                <div className={css.title}>{intl.formatMessage({ id: 'AccomodationItem.distance' })}</div>
                <div className={css.details}>{returnConfigData(howMuchTimeOptions, accomodation?.distance?.howMuchTime1)} {returnConfigData(howToMoveOptions, accomodation?.distance?.howToMove1)} </div>
            </div>
            <div className={css.table_text}>
                <div className={css.title}>{intl.formatMessage({ id: 'AccomodationItem.seasonPeriod' })}</div>
                <div className={css.details}>{listingSchool?.attributes?.profile?.publicData?.fixedCost?.highseason?.startDate} to {listingSchool?.attributes?.profile?.publicData?.fixedCost?.highseason?.endDate}</div>
            </div>
            <div className={css.table_text}>
                <div className={css.title}>{intl.formatMessage({ id: 'AccomodationItem.seasonCost' })}</div>
                <div className={css.details}>
                  {formattedHighPrice ? (
                      <React.Fragment>
                        <div title={highPriceTitle}>
                          {formattedHighPrice}
                        </div>
                      </React.Fragment>
                    ) : (
                      <div >
                        <FormattedMessage id="ManageAccomodationCard.priceNotSet" />
                      </div>
                    )}
          </div>
            </div>
        </div>
        <div className={css.money_div}>
        {formattedPrice ? (
            <React.Fragment>
              <div  title={priceTitle}>
                {formattedPrice}
              </div>
            </React.Fragment>
          ) : (
            <div >
              <FormattedMessage id="ManageAccomodationCard.priceNotSet" />
            </div>
          )}
        </div>
      </div>
    </>
  )
  }
}

export default AccomodationItem