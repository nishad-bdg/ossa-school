import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditAccomodationTypeForm.module.css';

const CustomBroadTypeSelectField = props => {
  const { name, id, broadTypes, intl } = props;
  const broadTypeLabel = intl.formatMessage({
    id: 'EditAccomodationTypeForm.broadTypeLabel',
  });
  const broadTypePlaceholder = intl.formatMessage({
    id: 'EditAccomodationTypeForm.broadTypePlaceholder',
  });
  const broadTypeRequired = required(
    intl.formatMessage({
      id: 'EditAccomodationTypeForm.broadTypeRequired',
    })
  );
  return broadTypes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={broadTypeLabel}
      validate={broadTypeRequired}
    >
      <option disabled value="">
        {broadTypePlaceholder}
      </option>
      {broadTypes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomBroadTypeSelectField;
