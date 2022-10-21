import React from 'react'
import classNames from 'classnames'
import { Form as FinalForm } from 'react-final-form';

import {
    Form,
    FieldTextInput,
} from '../../components';

import css from './ApplicationForm.module.css';
import { ensureCurrentUser } from '../../util/data';

const FormPayment = props => {

    return (
        <FinalForm
            {...props}
            render={fieldRenderProps => {
                const {
                    form,
                    currentUser,
                    className,
                    formId,
                    handleSubmit,
                    rootClassName,
                    data,
                    form: {
                        mutators: { push, pop },
                    },
                } = fieldRenderProps;


                const user = ensureCurrentUser(currentUser);
                const idUser = user && user.id ? user.id.uuid : '';

                const amountTotal = data.length > 0 ? Number(data[0].total.replace('$', '')) : 0;
                const txAmount = amountTotal*(10/100);

                const classes = classNames(rootClassName || css.root, className);

                return (
                    <Form className={classes} id={formId} action="https://credit.j-payment.co.jp/link/bankcheck">
                        <FieldTextInput type="hidden" name="aid" defaultValue="123813" isUncontrolled />
                        <FieldTextInput type="hidden" name="cod" defaultValue="foo" isUncontrolled />
                        <FieldTextInput type="hidden" name="jb" defaultValue="CAPTURE" isUncontrolled />
                        <FieldTextInput type="hidden" name="am" defaultValue={amountTotal} isUncontrolled />
                        <FieldTextInput type="hidden" name="tx" defaultValue={txAmount} isUncontrolled />
                        <FieldTextInput type="hidden" name="sf" defaultValue="0" isUncontrolled />
                        <FieldTextInput type="hidden" name="user_id" defaultValue={idUser} isUncontrolled/>
                    </Form>
                );
            }}
        />
    )
}

export default FormPayment;