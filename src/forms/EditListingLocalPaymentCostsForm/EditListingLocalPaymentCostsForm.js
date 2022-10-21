import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { LINE_ITEM_NIGHT, LINE_ITEM_DAY, propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput } from '../../components';
import css from './EditListingLocalPaymentCostsForm.module.css';

const { Money } = sdkTypes;

export const EditListingLocalPaymentCostsFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        disabled,
        ready,
        handleSubmit,
        intl,
        invalid,
        pristine,
        saveActionMsg,
        updated,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const unitType = config.bookingUnitType;
      const isNightly = unitType === LINE_ITEM_NIGHT;
      const isDaily = unitType === LINE_ITEM_DAY;

      const translationKey = 'EditListingMaterialFeeForm.pricePerDay';

      const sspTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requiredSspTitle',
      });

      const textbookTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requiredTextbookTitle',
      });

      const acrTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requireAcrTitle',
      });

      const managementFeeTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requireManagementFeeTitle',
      });

      const electricityFeeTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requireElectricityFeeTitle',
      });

      const depositTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requireDepositTitle',
      });

      const visaExtensionFeeTitle = intl.formatMessage({
        id: 'EditListingLocalPaymentCostsForm.requireVisaExtensionFeeTitle',
      });

      const sspPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const textbookPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const acrPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const managementFeePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const electricityFeePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const depositPlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const visaExtensionFeePlaceholderMessage = intl.formatMessage({
        id: 'EditListingPricingForm.priceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditListingPricingForm.priceRequired',
        })
      );
      const minPrice = new Money(
        config.listingMinimumPriceSubUnits,
        config.currency
      );
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditListingPricingForm.priceTooLow',
          },
          {
            minPrice: formatMoney(intl, minPrice),
          }
        ),
        config.listingMinimumPriceSubUnits
      );
      const priceValidators = config.listingMinimumPriceSubUnits
        ? validators.composeValidators(priceRequired, minPriceRequired)
        : priceRequired;

      const classes = classNames(css.root, className);
      const submitReady = (updated && pristine) || ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || disabled || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditListingPricingForm.showListingFailed" />
            </p>
          ) : null}

          {/* ssp */}
          <FieldCurrencyInput
            id="ssp"
            name="ssp"
            className={css.title}
            autoFocus
            label={sspTitle}
            placeholder={sspPlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* ssp */}

          {/* textbook */}
          <FieldCurrencyInput
            id="textbook"
            name="textbook"
            className={css.title}
            label={textbookTitle}
            placeholder={textbookPlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* textbook */}

          {/* acr i-card */}
          <FieldCurrencyInput
            id="managementFee"
            name="acrIcard"
            className={css.title}
            label={acrTitle}
            placeholder={acrPlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* acr i-card */}

          {/* management fee */}
          <FieldCurrencyInput
            id="managementFee"
            name="managementFee"
            className={css.title}
            label={managementFeeTitle}
            placeholder={managementFeePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* management fee */}

          {/* Electricity */}

          <FieldCurrencyInput
            id="electricityFee"
            name="electricityFee"
            className={css.title}
            label={electricityFeeTitle}
            placeholder={electricityFeePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />

          {/* Electricity */}

          {/* Deposit */}
          <FieldCurrencyInput
            id="deposit"
            name="deposit"
            className={css.title}
            label={depositTitle}
            placeholder={depositPlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* Deposit */}

          {/* Visa Extension */}
          <FieldCurrencyInput
            id="visaExtensionFee"
            name="visaExtensionFee"
            className={css.title}
            label={visaExtensionFeeTitle}
            placeholder={visaExtensionFeePlaceholderMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />
          {/* Visa extension */}

          <Button
            className={css.submitButton}
            type="submit"
            inProgress={submitInProgress}
            disabled={submitDisabled}
            ready={submitReady}
          >
            {saveActionMsg}
          </Button>
        </Form>
      );
    }}
  />
);

EditListingLocalPaymentCostsFormComponent.defaultProps = { fetchErrors: null };

EditListingLocalPaymentCostsFormComponent.propTypes = {
  intl: intlShape.isRequired,
  onSubmit: func.isRequired,
  saveActionMsg: string.isRequired,
  disabled: bool.isRequired,
  ready: bool.isRequired,
  updated: bool.isRequired,
  updateInProgress: bool.isRequired,
  fetchErrors: shape({
    showListingsError: propTypes.error,
    updateListingError: propTypes.error,
  }),
};

export default compose(injectIntl)(EditListingLocalPaymentCostsFormComponent);
