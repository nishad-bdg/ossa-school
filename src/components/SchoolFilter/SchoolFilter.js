import React from 'react';
import { array, bool } from 'prop-types';
import PriceFilterPlain from './SchoolFilterPlain';
import SchoolFilterPopup from './SchoolFilterPopup';

const PriceFilter = props => {
  const { showAsPopup, cities, citySchools, cityNameChanged, labelId, ...rest } = props;
  return showAsPopup ? (
    <SchoolFilterPopup
      cities={cities}
      citySchools={citySchools}
      labelId={labelId}
      cityNameChanged={cityNameChanged}
      {...rest}
    />
  ) : (
    <PriceFilterPlain {...rest} />
  );
};

PriceFilter.defaultProps = {
  showAsPopup: false,
  cities: [],
  citySchools: [],
};

PriceFilter.propTypes = {
  showAsPopup: bool,
  cities: array,
  citySchools: array,
};

export default PriceFilter;
