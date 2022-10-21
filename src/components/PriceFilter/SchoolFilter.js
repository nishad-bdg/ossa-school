import React from 'react';
import { bool } from 'prop-types';
import PriceFilterPlain from './PriceFilterPlain';
import PriceFilterPopup from './PriceFilterPopup';

const SchoolFilter = props => {
  const { showAsPopup, labelId, ...rest } = props;
  return showAsPopup ? <PriceFilterPopup labelId={labelId} {...rest} /> : <PriceFilterPlain {...rest} />;
};

SchoolFilter.defaultProps = {
  showAsPopup: false,
};

SchoolFilter.propTypes = {
  showAsPopup: bool,
};

export default SchoolFilter;
