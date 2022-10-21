import React from 'react';
import { required } from '../../util/validators';
import { FieldSelect } from '../../components';

import css from './ApplicationFlowForm.module.css';

const CustomSelectField = props => {
  const { name, id,options, label, placeholder, requiredMessage,handleOnchange, intl } = props;
  const roomTypeRequired = required(requiredMessage);
  return options ? (
    <FieldSelect
      className={css.category}
      name={name}
      id={id}
      label={label}
      validate={roomTypeRequired}
      
      // onChange={e => {
      //   setSelectedOption(e.target.value)
      //   // handleOnchange(e.target.value)
      // }}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map(c => (
        <option key={c.key} value={c.key}>
          {c.label}
        </option>
      ))}
    </FieldSelect>
  ) : null;
};

export default CustomSelectField;
