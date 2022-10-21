import React, { Component } from 'react';
import { array, arrayOf, func, node, number, shape, string } from 'prop-types';
import classNames from 'classnames';

import { injectIntl, intlShape } from '../../util/reactIntl';
import { formatCurrencyMajorUnit } from '../../util/currency';

import { OutsideClickHandler } from '../../components';
import { SchoolFilterForm } from '../../forms';
import css from './SchoolFilterPopup.module.css';

const KEY_CODE_ESCAPE = 27;
const RADIX = 10;

const getCityQueryParamName = queryParamNames => {
  return Array.isArray(queryParamNames)
    ? queryParamNames[0]
    : typeof queryParamNames === 'string'
    ? queryParamNames
    : 'cityName';
};

class SchoolFilterPopup extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.filter = null;
    this.filterContent = null;

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleOpen = this.toggleOpen.bind(this);
    this.positionStyleForContent = this.positionStyleForContent.bind(this);
  }

  handleSubmit(values) {
    const { onSubmit, queryParamNames } = this.props;
    this.setState({ isOpen: false });
    const cityQueryParamName = getCityQueryParamName(queryParamNames);
    onSubmit(values, cityQueryParamName);
  }

  handleClear() {
    const { onSubmit, queryParamNames } = this.props;
    this.setState({ isOpen: false });
    const cityQueryParamName = getCityQueryParamName(queryParamNames);
    onSubmit(null, cityQueryParamName);
  }

  handleCancel() {
    const { onSubmit, initialValues } = this.props;
    this.setState({ isOpen: false });
    onSubmit(initialValues);
  }

  handleBlur() {
    this.setState({ isOpen: false });
  }

  handleKeyDown(e) {
    // Gather all escape presses to close menu
    if (e.keyCode === KEY_CODE_ESCAPE) {
      this.toggleOpen(false);
    }
  }

  toggleOpen(enforcedState) {
    if (enforcedState) {
      this.setState({ isOpen: enforcedState });
    } else {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  }

  positionStyleForContent() {
    if (this.filter && this.filterContent) {
      // Render the filter content to the right from the menu
      // unless there's no space in which case it is rendered
      // to the left
      const distanceToRight =
        window.innerWidth - this.filter.getBoundingClientRect().right;
      const labelWidth = this.filter.offsetWidth;
      const contentWidth = this.filterContent.offsetWidth;
      const contentWidthBiggerThanLabel = contentWidth - labelWidth;
      const renderToRight = distanceToRight > contentWidthBiggerThanLabel;
      const contentPlacementOffset = this.props.contentPlacementOffset;

      const offset = renderToRight
        ? { left: contentPlacementOffset }
        : { right: contentPlacementOffset };
      // set a min-width if the content is narrower than the label
      const minWidth =
        contentWidth < labelWidth ? { minWidth: labelWidth } : null;

      return { ...offset, ...minWidth };
    }
    return {};
  }

  render() {
    const {
      rootClassName,
      className,
      id,
      labelId,
      label,
      queryParamNames,
      initialValues,
      min,
      max,
      step,
      intl,
      citySchools,
      cities,
      cityNameChanged,
    } = this.props;
    const classes = classNames(rootClassName || css.root, className);

    const cityQueryParam = getCityQueryParamName(queryParamNames);
    const initialPrice =
      initialValues && initialValues[cityQueryParam]
        ? parse(initialValues[cityQueryParam])
        : {};
    const { cityName } = initialPrice || {};

    const hasValue = value => value != null;
    const hasInitialValues = initialValues && hasValue(cityName);

    const currentLabel = hasInitialValues
      ? intl.formatMessage(
          { id: 'PriceFilter.labelSelectedButton' },
          {
            cityName: cityName,
            schoolName: schoolName
          }
        )
      : label
      ? label
      : intl.formatMessage({ id: 'PriceFilter.label' });

    const labelStyles = hasInitialValues ? css.labelSelected : css.label;
    const contentStyle = this.positionStyleForContent();

    return (
      <OutsideClickHandler onOutsideClick={this.handleBlur}>
        <div
          className={classes}
          onKeyDown={this.handleKeyDown}
          ref={node => {
            this.filter = node;
          }}
        >
          <button
            id={labelId}
            className={labelStyles}
            onClick={() => this.toggleOpen()}
          >
            {currentLabel}
          </button>
          <SchoolFilterForm
            id={id}
            initialValues={{ cityName: '' }}
            cities={cities}
            citySchools={citySchools}
            onClear={this.handleClear}
            onCancel={this.handleCancel}
            onSubmit={this.handleSubmit}
            cityNameChanged={cityNameChanged}
            intl={intl}
            contentRef={node => {
              this.filterContent = node;
            }}
            style={contentStyle}
            min={min}
            max={max}
            step={step}
            showAsPopup
            isOpen={this.state.isOpen}
          />
        </div>
      </OutsideClickHandler>
    );
  }
}

SchoolFilterPopup.defaultProps = {
  rootClassName: null,
  className: null,
  initialValues: null,
  contentPlacementOffset: 0,
  liveEdit: false,
  step: number,
  cities: [],
  citySchools: []
};

SchoolFilterPopup.propTypes = {
  rootClassName: string,
  className: string,
  id: string.isRequired,
  label: node,
  queryParamNames: arrayOf(string),
  onSubmit: func.isRequired,
  initialValues: shape({
    price: string,
  }),
  contentPlacementOffset: number,
  cityName: string,
  step: number,
  cities: array,
  citySchools: array,

  // form injectIntl
  intl: intlShape.isRequired,
};

export default injectIntl(SchoolFilterPopup);
