import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from '../../util/reactIntl';
import classNames from 'classnames';

import { NamedLink } from '../../components';

import css from './SectionHowItWorks.module.css';

const SectionHowItWorks = props => {
  const { rootClassName, className } = props;

  const classes = classNames(rootClassName || css.root, className);
  return (
    <div className={css.howToWorks + ' container p-5'}>
      <div className={css.title + ' text-center '}>
        <span>ABOUT</span>
        <br />
        <p>warpleって?</p>
      </div>

      <div className={css.steps + ' text-left'}>
        <div className={css.step}>
          Image
        </div>

        <div className={css.step}>
          <h2 className={css.stepTitle}>
            留学を、
            もっとかしこく、
            おもしろく。
          </h2>
          <p>
            warple は、語学学校/プログラムの検索や申込み、 渡航までの準備や学校/宿泊先の手配まで 留学に必要なすべてをインターネット上で完結させることにより、 どこよりも安く、どこよりもあなたらしく、 留学が実現できるサービスです。
          </p>
        </div>
      </div>
      <div className='d-flex justify-content-center'>
        <button className='btn btn-lg btn-info mx-5'>初めての方へ</button>
      </div>
    </div>
  );
};

SectionHowItWorks.defaultProps = { rootClassName: null, className: null };

const { string } = PropTypes;

SectionHowItWorks.propTypes = {
  rootClassName: string,
  className: string,
};

export default SectionHowItWorks;
