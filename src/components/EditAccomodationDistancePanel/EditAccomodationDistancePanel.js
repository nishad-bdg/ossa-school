import React from 'react';
import { bool, func, object, string } from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from '../../util/reactIntl';
import { findOptionsForSelectFilter } from '../../util/search';
import { EditAccomodationDistanceForm } from '../../forms';
import config from '../../config';

import css from './EditAccomodationDistancePanel.module.css';
import { Component } from 'react';

class EditAccomodationDistancePanel extends Component {
  constructor(props) {
    super(props);
    this.state = { countNumber: 1 };
    this.handaleUpdate = this.handaleUpdate.bind(this);
    this.updateCount = this.updateCount.bind(this);

  }
  handaleUpdate(listing) {
    if (listing?.distance && this.state.countNumber === 1) {
      this.setState({
        countNumber: (Number(Object.keys(listing?.distance).length) / 2) + 1
      });
    } else {
      this.setState((state, props) => ({
        countNumber: state.countNumber + 1
      }));
    }
  }
  updateCount(distance) {
    if (distance) {
      this.setState({
        countNumber: Number(Object.keys(distance).length) / 2
      })
    }
  }
  render() {
    const {
      className,
      rootClassName,
      listing,
      disabled,
      ready,
      onSubmit,
      onChange,
      submitButtonText,
      panelUpdated,
      updateInProgress,
      errors,
    } = this.props;

    const classes = classNames(rootClassName || css.root, className);
    if (listing?.distance) {
      var { ...intProps } = listing?.distance;
    } else {
      var { ...intProps } = {
        howToMove1: "", howMuchTime1: ""
      };
    }


    const panelTitle = (
      <FormattedMessage id="EditAccomodationDistancePanel.createListingTitle" />
    );

    const howMuchTimeOptions = findOptionsForSelectFilter('howMuchTime', config.custom.filters);
    const howToMoveOptions = findOptionsForSelectFilter('howToMove', config.custom.filters);

    return (
      <div className={classes}>
        <h1 className={css.title}>{panelTitle} <button className='p-10 btn btn-primary btn-md' onClick={() => this.handaleUpdate(listing)}>+</button></h1>
        <EditAccomodationDistanceForm
          className={css.form}
          initialValues={{ ...intProps }}
          saveActionMsg={submitButtonText}
          onSubmit={values => {
            const { ...updateValues } = values;
            onSubmit(updateValues);
          }}
          onChange={onChange}
          disabled={disabled}
          ready={ready}
          updated={panelUpdated}
          updateInProgress={updateInProgress}
          fetchErrors={errors}
          countNumber={listing?.distance && this.state.countNumber === 1? (Number(Object.keys(listing?.distance).length) / 2) : this.state.countNumber}
          howToMoves={howToMoveOptions}
          howMuchTimes={howMuchTimeOptions}
        />
      </div>
    );
  }
};

EditAccomodationDistancePanel.defaultProps = {
  className: null,
  rootClassName: null,
  errors: null,
  listing: null,
};

EditAccomodationDistancePanel.propTypes = {
  className: string,
  rootClassName: string,

  // We cannot use propTypes.listing since the listing might be a draft.
  listing: object,

  disabled: bool.isRequired,
  ready: bool.isRequired,
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  submitButtonText: string.isRequired,
  panelUpdated: bool.isRequired,
  updateInProgress: bool.isRequired,
  errors: object.isRequired,
};

export default EditAccomodationDistancePanel;
