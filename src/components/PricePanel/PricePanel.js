import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { FormattedMessage, intlShape, injectIntl } from '../../util/reactIntl';

import css from './PricePanel.module.css';

const LineItems = (props) => {
    const { lineItems, intl } = props;
    return (
        lineItems.map((line, i) => {
            return (
                Object.entries(line).map((item, j) => {
                    return (
                        <div className={css.lineItem} key={j}>
                            <span className={css.labelName}>{intl.formatMessage({
                                id: `PricePanel.lineItem${j+1}`,
                            })}</span>
                            <span className={css.value}>{item[1]}</span>
                        </div>
                    )
                })
            )
        })
    );
}

const PricePanel = props => {
    const { className, rootClassName, lineItems, intl } = props;
    const classes = classNames(rootClassName || css.root, className);

    return (
        <div className={classes}>
            <div className={css.panelWrapper}>
                {lineItems && <LineItems lineItems={lineItems} intl={intl}/>}
            </div>
        </div>
    );
};

const { string, array } = PropTypes;

PricePanel.defaultProps = {
    className: null,
    rootClassName: null,
    lineItems: null
};

PricePanel.propTypes = {
    className: string,
    rootClassName: string,
    intl: intlShape.isRequired,
    lineItems: array
};

export default injectIntl(PricePanel);
