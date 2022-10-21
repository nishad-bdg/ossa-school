import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { propTypes } from '../../util/types';
import moment from 'moment';
import { ensureCurrentUser } from '../../util/data';
import { isScrollingDisabled } from '../../ducks/UI.duck';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import {
  Page,
  UserNav,
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  NamedLink, PricePanel,
} from '../../components';
import { TopbarContainer } from '../../containers';

import css from './BookingPage.module.css';
import { parse } from '../../util/urlHelpers';
import config from '../../config';

const { Money } = sdkTypes;
export class BookingPageComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tosModalOpen: false
    };
  }

  render() {
    const {
      currentUser,
      scrollingDisabled,
      intl,
      location,
    } = this.props;

    const { gid, rst, ap, ec, god, cod, am, tx, sf, ta, bank, exp, others } = location ? parse(location.search) : null;
    /* If currency is global
    const price = formatMoney(intl, new Money(am, config.currency));
    */

    const price = formatMoney(intl, new Money(am, 'JPY'));
 
    const paymentDate = moment(new Date(exp.toString().substr(0, 4),exp.toString().substr(4, 2)-1,exp.toString().substr(6, 2))).format('YYYY/MM/DD');

    const objAcc = {
      bankCode: null,
      institutionName: null,
      branchNo: null,
      branchName: null,
      accType: null,
      accNo: null,
      accName: null
    }

    const accInfo = [...bank.split('.')].reduce((obj, v, i) => {
      obj[Object.keys(objAcc)[i]] = v; return obj }, objAcc)

    const { bankCode, institutionName, branchNo, branchName, accType, accNo, accName} = accInfo;

    const title = intl.formatMessage({ id: 'BookingPage.title' });

    

    const lineItemsData = [{
      dateStart: '2002/03/10',
      dateEnd: '2002/04/15',
      langExpense: formatMoney(intl, new Money(2000, 'JPY')),
      accomodationExpense: formatMoney(intl, new Money(12000, 'JPY')),
      optionCost: formatMoney(intl, new Money(12000, 'JPY')),
      total: formatMoney(intl, new Money(26000, 'JPY'))
    }];

    return (
      <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
        <LayoutSingleColumn>
          <LayoutWrapperTopbar>
            <TopbarContainer currentPage="BookingPage" />
            <UserNav selectedPageName="BookingPage" />
          </LayoutWrapperTopbar>
          <LayoutWrapperMain>
            <div className={css.section}>
              <div className={css.headingContainer}>
                <h1 className={css.heading}>
                  <FormattedMessage id="BookingPage.heading" />
                </h1>
              </div>
            </div>
            <div className={css.sectionContent}>
              <h3 className={css.subTitle}>
                <FormattedMessage id="BookingPage.subTitle" />
              </h3>
              <div className={css.formContainer}>
                <div className={css.colfields}>
                  <div className={css.rowFields}>
                    <p><FormattedMessage id="BookingPage.message1" /></p>
                    <p><FormattedMessage id="BookingPage.message2" /></p>
                  </div>
                  <div className={css.rowFields} style={{ paddingLeft: '15px' }}>
                    <p><FormattedMessage id="BookingPage.paymentMessageTitle" /></p>
                    <div>
                      <ul className={css.transactionInfo}>
                        <li>
                          <FormattedMessage id="BookingPage.settlementNumber" />
                          <span className={css.paddingLeft30}>{gid}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.settlementAmount" />
                          <span className={css.paddingLeft30}>{price}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.paymentDue" />
                          <span className={css.paddingLeft30}>{paymentDate}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.payerName" />
                          <span className={css.cardName}>{accName}</span>
                        </li>
                      </ul>
                      <p><FormattedMessage id="BookingPage.bankAccount" /></p>
                      <ul className={css.transactionInfo}>
                        <li>
                          <FormattedMessage id="BookingPage.bankCode" />
                          <span className={css.paddingLeft30}>{bankCode}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.institutionName" />
                          <span className={css.paddingLeft30}>{institutionName}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.branchNo" />
                          <span className={css.paddingLeft30}>{branchNo}</span>
                        </li>
                        <li>
                        <FormattedMessage id="BookingPage.branchName" />
                          <span className={css.paddingLeft30}>{branchName}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.accountType" />
                          <span className={css.paddingLeft30}>{accType}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.accountNo" />
                          <span className={css.paddingLeft30}>{accNo}</span>
                        </li>
                        <li>
                          <FormattedMessage id="BookingPage.accountName" />
                          <span className={css.paddingLeft30}>{accName}</span>
                        </li>
                      </ul>

                    </div>
                  </div>
                  <div className={css.rowFields}>
                    <p><FormattedMessage id="BookingPage.confirmationMessage" values={{br: <br/> }} /></p>
                  </div>
                </div>
                <div className={css.colform}>
                  <h3 className={css.titleDetails}>
                    <FormattedMessage id="ApplicationPage.details" />
                  </h3>
                  <div className={css.holdPricings}>
                    <PricePanel lineItems={lineItemsData} />
                  </div>
                </div>
              </div>
            </div>
          </LayoutWrapperMain>
          <LayoutWrapperFooter>
            <Footer />
          </LayoutWrapperFooter>
        </LayoutSingleColumn>
      </Page>
    );
  }
}

BookingPageComponent.defaultProps = {
  currentUser: null,
};

const { bool, func, object, shape, string } = PropTypes;

BookingPageComponent.propTypes = {
  currentUser: propTypes.currentUser,
  // from injectIntl
  intl: intlShape.isRequired,
};

const mapStateToProps = state => {
  const { currentUser } = state.user;
  return {
    currentUser,
    scrollingDisabled: isScrollingDisabled(state),
  };
};

const BookingPage = compose(
  connect(
    mapStateToProps,
    null
  ),
  injectIntl
)(BookingPageComponent);

export default BookingPage;
