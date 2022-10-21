import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { compose } from 'redux';
import { Form as FinalForm } from 'react-final-form';
import { intlShape, injectIntl, FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';
import config from '../../config';
import { propTypes } from '../../util/types';
import * as validators from '../../util/validators';
import { formatMoney } from '../../util/currency';
import { types as sdkTypes } from '../../util/sdkLoader';
import { Button, Form, FieldCurrencyInput } from '../../components';
import css from './EditAirportTransferForm.module.css';

const { Money } = sdkTypes;

export const EditAirportTransferFormComponent = props => (
  <FinalForm
    {...props}
    render={formRenderProps => {
      const {
        className,
        ready,
        handleSubmit,
        intl,
        invalid,
        saveActionMsg,
        updateInProgress,
        fetchErrors,
      } = formRenderProps;

      const perUnitMessage = intl.formatMessage({
        id: 'EditAirportTransferForm.feesPerUnit',
      });

      const onePricePlaceholderMessage = intl.formatMessage({
        id: 'EditAirportTransferForm.onePriceInputPlaceholder',
      });

      const returnPricePlaceholderMessage = intl.formatMessage({
        id: 'EditAirportTransferForm.returnPriceInputPlaceholder',
      });

      const roundPricePlaceholderMessage = intl.formatMessage({
        id: 'EditAirportTransferForm.roundPriceInputPlaceholder',
      });

      const priceRequired = validators.required(
        intl.formatMessage({
          id: 'EditAirportTransferForm.priceRequired',
        })
      );
      const minPrice = new Money(config.listingMinimumPriceSubUnits, config.currency);
      const minPriceRequired = validators.moneySubUnitAmountAtLeast(
        intl.formatMessage(
          {
            id: 'EditAirportTransferForm.priceTooLow',
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
      const submitReady = ready;
      const submitInProgress = updateInProgress;
      const submitDisabled = invalid || submitInProgress;
      const { updateListingError, showListingsError } = fetchErrors || {};

      return (
        <Form onSubmit={handleSubmit} className={classes}>
          {updateListingError ? (
            <p className={css.error}>
              <FormattedMessage id="EditAirportTransferForm.updateFailed" />
            </p>
          ) : null}
          {showListingsError ? (
            <p className={css.error}>
              <FormattedMessage id="EditAirportTransferForm.showListingFailed" />
            </p>
          ) : null}
          <FieldCurrencyInput
            id="one_way_price"
            name="one_way_price"
            className={css.priceInput}
            autoFocus
            label={onePricePlaceholderMessage }
            placeholder={perUnitMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />



          <FieldCurrencyInput
            id="return_route_price"
            name="return_route_price"
            className={css.priceInput}
            autoFocus
            label={returnPricePlaceholderMessage}
            placeholder={perUnitMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />

          <FieldCurrencyInput
            id="round_trip_price"
            name="round_trip_price"
            className={css.priceInput}
            autoFocus
            label={roundPricePlaceholderMessage}
            placeholder={perUnitMessage}
            currencyConfig={config.currencyConfig}
            validate={priceValidators}
          />



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

EditAirportTransferFormComponent.defaultProps = { fetchErrors: null };

EditAirportTransferFormComponent.propTypes = {
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

export default compose(injectIntl)(EditAirportTransferFormComponent);
