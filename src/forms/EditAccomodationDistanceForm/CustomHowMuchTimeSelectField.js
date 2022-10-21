import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditAccomodationDistanceForm.module.css';

const CustomHowMuchTimeSelectField = props => {
  const { name, id, howMuchTimes, countNumber, intl } = props;
  const howMuchTimeLabel = intl.formatMessage({
    id: 'EditAccomodationDistanceForm.howMuchTimeLabel',
  }, { countNumber: countNumber });
  const howMuchTimePlaceholder = intl.formatMessage({
    id: 'EditAccomodationDistanceForm.howMuchTimePlaceholder',
  });
  const howMuchTimeRequired = required(
    intl.formatMessage({
      id: 'EditAccomodationDistanceForm.howMuchTimeRequired',
    })
  );
  return howMuchTimes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={howMuchTimeLabel}
      validate={howMuchTimeRequired}
    >
      <option disabled value="">
        {howMuchTimePlaceholder}
      </option>
      {howMuchTimes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomHowMuchTimeSelectField;
