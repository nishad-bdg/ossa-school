import React from 'react';
import { bool, func, number, shape, string } from 'prop-types';
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
import css from './EditListingPricingForm.module.css';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';

const { Money } = sdkTypes;

export const EditListingPricingFormComponent = props => (
  <FinalForm
    {...props}
    mutators={{
      ...arrayMutators,
    }}
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

      const translationKey = isNightly
        ? 'EditListingPricingForm.pricePerNight'
        : isDaily
        ? 'EditListingPricingForm.pricePerDay'
        : 'EditListingPricingForm.pricePerUnit';

      const pricePerUnitMessage = intl.formatMessage({
        id: translationKey,
      });

      const tuitionFeeTitle = intl.formatMessage({
        id: 'EditListingPricingForm.requireTuitionFeeTitle',
      });

      const highSeasonTuitionFeeTitle = intl.formatMessage({
        id: 'EditListingPricingForm.requireHighSeasonTuitionFeeTitle',
      });

      const pricePlaceholderMessage = intl.formatMessage({
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

      const getNumberWithOrdinal = n => {
        const s = ['th', 'st', 'nd', 'rd'],
          v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
      };
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

          <FieldArray name="pricing">
            {({ fields }) =>
              fields.map((name, index) => (
                <div key={name} className={css.pricingContainer}>
                  <div className={css.customMarginRight}>
                    <FieldCurrencyInput
                      id="tuitionFee"
                      name={`${name}.tuitionFee`}
                      key={index}
                      className={css.title}
                      label={`${tuitionFeeTitle} ${getNumberWithOrdinal(
                        index + 1
                      )} week`}
                      placeholder={pricePlaceholderMessage}
                      currencyConfig={config.currencyConfig}
                      validate={priceValidators}
                    />
                  </div>

                  <div>
                    <FieldCurrencyInput
                      id="highSeasonTuitionFee"
                      name={`${name}.highSeasonTuitionFee`}
                      key={index}
                      className={css.title}
                      label={`${highSeasonTuitionFeeTitle} ${getNumberWithOrdinal(
                        index + 1
                      )} week`}
                      placeholder={pricePlaceholderMessage}
                      currencyConfig={config.currencyConfig}
                      validate={priceValidators}
                    />
                  </div>
                </div>
              ))
            }
          </FieldArray>

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

EditListingPricingFormComponent.defaultProps = { fetchErrors: null };

EditListingPricingFormComponent.propTypes = {
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

export default compose(injectIntl)(EditListingPricingFormComponent);
