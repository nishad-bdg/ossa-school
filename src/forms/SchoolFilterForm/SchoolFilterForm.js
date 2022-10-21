import React from 'react';
import { bool, func, number, object, string, array } from 'prop-types';
import classNames from 'classnames';
import debounce from 'lodash/debounce';
import { Field, Form as FinalForm, FormSpy } from 'react-final-form';
import { FormattedMessage, injectIntl, intlShape } from '../../util/reactIntl';
import locationIcon from '../../components/SectionLocations/images/locationIcon.svg';
import { OnChange } from 'react-final-form-listeners';

import { Form, FieldSelect } from '../../components';
import css from './SchoolFilterForm.module.css';

const DEBOUNCE_WAIT_TIME = 400;

// PriceFilterForm component
const SchoolFilterFormComponent = props => {
  const { liveEdit, onChange, onSubmit, onCancel, onClear, ...rest } = props;

  if (liveEdit && !onChange) {
    throw new Error(
      'PriceFilterForm: if liveEdit is true you need to provide onChange function'
    );
  }

  if (!liveEdit && !(onCancel && onClear && onSubmit)) {
    throw new Error(
      'PriceFilterForm: if liveEdit is false you need to provide onCancel, onClear, and onSubmit functions'
    );
  }

  const handleChange = debounce(
    formState => {
      if (formState.dirty) {
        const { ...restValues } = formState.values;
        onChange({
          ...restValues,
        });
      }
    },
    DEBOUNCE_WAIT_TIME,
    { leading: false, trailing: true }
  );

  const handleSubmit = values => {
    const { ...restValues } = values;
    return onSubmit({ ...restValues });
  };

  const formCallbacks = liveEdit
    ? { onSubmit: () => null }
    : { onSubmit: handleSubmit, onCancel, onClear };
  return (
    <FinalForm
      {...rest}
      {...formCallbacks}
      render={formRenderProps => {
        const {
          form,
          handleSubmit,
          id,
          showAsPopup,
          onClear,
          onCancel,
          isOpen,
          contentRef,
          style,
          intl,
          cities,
          citySchools,
          cityNameChanged,
        } = formRenderProps;

        const handleCancel = () => {
          // reset the final form to initialValues
          form.reset();
          onCancel();
        };

        const clear = intl.formatMessage({ id: 'PriceFilterForm.clear' });
        const cancel = intl.formatMessage({ id: 'PriceFilterForm.cancel' });
        const submit = intl.formatMessage({ id: 'PriceFilterForm.submit' });

        const classes = classNames(css.root, {
          [css.popup]: showAsPopup,
          [css.isOpenAsPopup]: showAsPopup && isOpen,
          [css.plain]: !showAsPopup,
          [css.isOpen]: !showAsPopup && isOpen,
        });

        const cityLabel = intl.formatMessage({
          id: 'CityFilterForm.labelSelectedCity',
        });
        const schoolLabel = intl.formatMessage({
          id: 'CityFilterForm.labelSelectedSchool',
        });

        return (
          <Form
            className={classes}
            onSubmit={handleSubmit}
            tabIndex="0"
            contentRef={contentRef}
            style={{ minWidth: '300px', ...style }}
          >
            <div className={css.contentWrapper}>
              <div
                style={{ minWidth: '190px' }}
                className={style.main_div_child}
              >
                <div className={style.child_text}>
                  <FieldSelect
                    className={css.title}
                    id="cityName"
                    name="cityName"
                    label={cityLabel}
                  >
                    <option value="" disabled>
                      {cityLabel}
                    </option>
                    {cities.map(x => (
                      <option key={x.area_name_en} value={x.area_name_en}>
                        {x.area_name_en}
                      </option>
                    ))}
                  </FieldSelect>

                  <OnChange name="cityName">
                    {value => {
                      cityNameChanged?.(value);
                    }}
                  </OnChange>

                  <FieldSelect
                    className={css.title}
                    id="schoolName"
                    name="schoolName"
                    label={schoolLabel}
                  >
                    <option value="" disabled>
                      {schoolLabel}
                    </option>
                    {citySchools.map(x => (
                      <option
                        key={x.attributes.profile.publicData.schoolName}
                        value={x.attributes.profile.publicData.schoolName}
                      >
                        {x.attributes.profile.publicData.schoolName}
                      </option>
                    ))}
                  </FieldSelect>

                  <div className="line-box">
                    <div className="line-2"></div>
                  </div>
                </div>
              </div>
            </div>

            {liveEdit ? (
              <FormSpy
                onChange={handleChange}
                subscription={{ values: true, dirty: true }}
              />
            ) : (
              <div className={css.buttonsWrapper}>
                <button
                  className={css.clearButton}
                  type="button"
                  onClick={onClear}
                >
                  {clear}
                </button>
                <button
                  className={css.cancelButton}
                  type="button"
                  onClick={handleCancel}
                >
                  {cancel}
                </button>
                <button className={css.submitButton} type="submit">
                  {submit}
                </button>
              </div>
            )}
          </Form>
        );
      }}
    />
  );
};

SchoolFilterFormComponent.defaultProps = {
  liveEdit: false,
  showAsPopup: false,
  isOpen: false,
  contentRef: null,
  style: null,
  step: 1,
  onCancel: null,
  onChange: null,
  onClear: null,
  onSubmit: null,
  cities: [],
  citySchools: [],
};

SchoolFilterFormComponent.propTypes = {
  id: string.isRequired,
  liveEdit: bool,
  showAsPopup: bool,
  onCancel: func,
  onChange: func,
  onClear: func,
  onSubmit: func,
  isOpen: bool,
  contentRef: func,
  style: object,
  min: number.isRequired,
  max: number.isRequired,
  step: number,
  citySchools: array,

  // form injectIntl
  intl: intlShape.isRequired,
};

const SchoolFilterForm = injectIntl(SchoolFilterFormComponent);

export default SchoolFilterForm;
