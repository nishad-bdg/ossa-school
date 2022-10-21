import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import config from '../../config';
import { countryCodes } from '../../translations/countryCodes';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { propTypes } from '../../util/types';
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
    Modal,
    TermsOfService,
    Footer,
    NamedLink,
} from '../../components';
import { ApplicationForm, FormPayment } from '../../forms';
import { TopbarContainer } from '../../containers';

import css from './ApplicationPage.module.css';
import { debounce } from 'lodash';

// Testing modal
const noop = () => null;

const { Money } = sdkTypes;
export class ApplicationPageComponent extends Component {

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
        } = this.props;

        const handleSubmitApplication = values => {

            console.log('values on form state', values)
            const application = {
                ...values
            };
           
            if (Object.keys(application).includes("paymethod") > 0) {
                debounce(document.getElementById('PaymentForm').submit(), 1000);
            }

        };

        const user = ensureCurrentUser(currentUser);

        const initialValues = {};

        const gendersAvailables = [
            { key: '0', label: 'man' },
            { key: '1', label: 'woman' },
            { key: '2', label: 'other' }
        ];

        const englishLevels = [
            { key: '0', label: 'basic' },
            { key: '1', label: 'intermediate' },
            { key: '2', label: 'advanced' },
        ]

        const questionsOptions = [
            { key: '0', label: 'No' },
            { key: '1', label: 'Yes' },
            { key: '2', label: 'No preference' }
        ]

        const visaTypes = [
            { key: '0', label: 'Visa' }
        ]

        const paymentMethods = [
            { key: '0', label: 'Bank transfer' }
        ]

        const lineItems = [{
            dateStart: '2002/03/10',
            dateEnd: '2002/04/15',
            langExpense: formatMoney(intl, new Money(2000, 'JPY')),
            accomodationExpense: formatMoney(intl, new Money(12000, 'JPY')),
            optionCost: formatMoney(intl, new Money(12000, 'JPY')),
            total: formatMoney(intl, new Money(26000, 'JPY'))
        }];

        const applicationForm = user.id ? (
            <ApplicationForm
                formId="ApplicationForm"
                className={css.form}
                currentUser={currentUser}
                countryCitizenOptions={countryCodes}
                sexOptions={gendersAvailables}
                englishLevelOptions={englishLevels}
                questionFamilyOptions={questionsOptions}
                questionSmokerOptions={questionsOptions}
                questionPetsOptions={questionsOptions}
                destinationOptions={countryCodes}
                paymentOptions={paymentMethods}
                visaTypeOptions={visaTypes}
                initialValues={initialValues}
                lineItemsData={lineItems}
                onOpenTermsOfService={() => this.setState({ tosModalOpen: true })}
                onSubmit={handleSubmitApplication}
            />
        ) : null;

        const paymentForm = user.id ? (
            <FormPayment
                formId="PaymentForm"
                className={css.form}
                currentUser={currentUser}
                data={lineItems}
                onSubmit={{}}
            />
        ) : null;

        const title = intl.formatMessage({ id: 'ApplicationPage.title' });

        return (
            <Page className={css.root} title={title} scrollingDisabled={scrollingDisabled}>
                <LayoutSingleColumn>
                    <LayoutWrapperTopbar>
                        <TopbarContainer currentPage="ApplicationPage" />
                        <UserNav selectedPageName="ApplicationPage" />
                    </LayoutWrapperTopbar>
                    <LayoutWrapperMain>
                        <div className={css.section}>
                            <div className={css.headingContainer}>
                                <h1 className={css.heading}>
                                    <FormattedMessage id="ApplicationPage.heading" />
                                </h1>
                            </div>
                        </div>
                        <div className={css.sectionContent}>
                            {applicationForm}
                            {paymentForm}
                        </div>
                        <Modal
                            id="ApplicationPage.tos"
                            isOpen={this.state.tosModalOpen}
                            onClose={() => this.setState({ tosModalOpen: false })}
                            usePortal
                            onManageDisableScrolling={noop}
                        >
                            <div className={css.termsWrapper}>
                                <h2 className={css.termsHeading}>
                                    <FormattedMessage id="ApplicationPage.termsHeading" />
                                </h2>
                                <TermsOfService />
                            </div>
                        </Modal>
                    </LayoutWrapperMain>
                    <LayoutWrapperFooter>
                        <Footer />
                    </LayoutWrapperFooter>
                </LayoutSingleColumn>
            </Page>
        );
    }
}

ApplicationPageComponent.defaultProps = {
    currentUser: null,
};

const { bool, func, object, shape, string } = PropTypes;

ApplicationPageComponent.propTypes = {
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

const ApplicationPage = compose(
    connect(
        mapStateToProps,
        null
    ),
    injectIntl
)(ApplicationPageComponent);

export default ApplicationPage;
