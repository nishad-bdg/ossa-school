import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './EditAccomodationDistanceForm.module.css';

const CustomHowToMoveSelectField = props => {
  const { name, id, howToMoves,
    countNumber, intl } = props;
  const howToMoveLabel = intl.formatMessage({
    id: 'EditAccomodationDistanceForm.howToMoveLabel'
  }, { countNumber: countNumber });

  const howToMovePlaceholder = intl.formatMessage({
    id: 'EditAccomodationDistanceForm.howToMovePlaceholder',
  });
  const howToMoveRequired = required(
    intl.formatMessage({
      id: 'EditAccomodationDistanceForm.howToMoveRequired',
    })
  );
  return howToMoves ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={howToMoveLabel}
      validate={howToMoveRequired}
    >
      <option disabled value="">
        {howToMovePlaceholder}
      </option>
      {howToMoves.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomHowToMoveSelectField;
