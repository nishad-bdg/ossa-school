import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditAccomodationTypeForm.module.css';

const CustomRoomTypeSelectField = props => {
  const { name, id, roomTypes, intl } = props;
  const roomTypeLabel = intl.formatMessage({
    id: 'EditAccomodationTypeForm.roomTypeLabel',
  });
  const roomTypePlaceholder = intl.formatMessage({
    id: 'EditAccomodationTypeForm.roomTypePlaceholder',
  });
  const roomTypeRequired = required(
    intl.formatMessage({
      id: 'EditAccomodationTypeForm.roomTypeRequired',
    })
  );
  return roomTypes ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={roomTypeLabel}
      validate={roomTypeRequired}
    >
      <option disabled value="">
        {roomTypePlaceholder}
      </option>
      {roomTypes.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomRoomTypeSelectField;
