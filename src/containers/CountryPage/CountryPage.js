import React from 'react';
import config from '../../config';
import { twitterPageURL } from '../../util/urlHelpers';
import { StaticPage, TopbarContainer } from '../../containers';
import {
  LayoutSingleColumn,
  LayoutWrapperTopbar,
  LayoutWrapperMain,
  LayoutWrapperFooter,
  Footer,
  ExternalLink,
} from '../../components';

import css from './CountryPage.module.css';
import image from './about-us-1056.jpg';

const CountryPage = () => {
  const { siteTwitterHandle, siteFacebookPage } = config;
  const siteTwitterPage = twitterPageURL(siteTwitterHandle);

  // prettier-ignore
  return (
    <StaticPage
      title="Country"
      schema={{
        '@context': 'http://schema.org',
        '@type': 'AboutPage',
        description: 'Country',
        name: 'Country page',
      }}
    >
      <LayoutSingleColumn>
        {/* <LayoutWrapperTopbar>
          <TopbarContainer />
        </LayoutWrapperTopbar> */}

        <LayoutWrapperMain >
          <img className={css.coverImage} src={image} alt="My first ice cream." />
          <div className={css.staticPageWrapper}>
            <div className={css.contentWrapper}>
                <div className={css.countryTitleWrap}>
                    <h1 className={css.countryTitle}> Australia</h1>
                </div>
                <div className={css.contentSide}>
                  <p>日本の約21倍の面積を誇り、南半球に位置するオーストラリアは、その広い国土から都市によってまったく違った気候風土を持っているのが特徴です。移民が多いため、オーストラリアの文化や社会は非常に多様性に富んでおり、国民のその多様なバックグラウンドから平等主義社会が徹底されています。また非常に社交的でフレンドリーな国民性も、移民大国であるオーストラリアならでは。質の高い教育の提供と安全で快適に学ぶ環境の提供について定めた、留学生の権利を守る法制度も整えられている上に、親日国家ということもあり、日本人留学生やワーキングホリデーでの海外渡航者に人気の国となっています。</p>
                </div>
            </div>
          </div>
          <div className={css.countryMapWraper}>
            <div className={css.mapTitleWrap}>
                <h2 className={css.mapTitle}> Area</h2>
                <h2 className={css.mapSubTitle}> エリアを選択する</h2>
            </div>
          </div>
           
       
        </LayoutWrapperMain>

        <LayoutWrapperFooter>
          <Footer />
        </LayoutWrapperFooter>
      </LayoutSingleColumn>
    </StaticPage>
  );
};

export default CountryPage;
