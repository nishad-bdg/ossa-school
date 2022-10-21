import React from 'react';
import { FormattedMessage } from '../../util/reactIntl';
import { PropertyGroup } from '../../components';

import css from './ListingPage.module.css';
import TableHeading from '../EstimationPage/CustomComponent/TableHeading';

const SectionFeaturesMaybe = props => {
  const { options, publicData } = props;
  if (!publicData) {
    return null;
  }


  let japaniRequiredLevel;
  if(publicData.requiredLevel === "Beginner"){
    japaniRequiredLevel = "初心者";
  } else if(publicData.requiredLevel === "Elementary"){
    japaniRequiredLevel = "初級";
  } else if(publicData.requiredLevel === "Pre Intermediate"){
    japaniRequiredLevel = "中下級";
  } else if(publicData.requiredLevel === "Intermediate"){
    japaniRequiredLevel = "中級";
  } else if(publicData.requiredLevel === "Upper Intermediate"){
    japaniRequiredLevel = "中上級";
  } else if(publicData.requiredLevel === "Advanced"){
    japaniRequiredLevel = "上級";
  } else {
    japaniRequiredLevel = publicData.requiredLevel;
  }


  let japaniCourseStartDate;
  if(publicData.courseStartDate === "Every Monday"){
    japaniCourseStartDate = "毎週月曜日";
  } else if(publicData.courseStartDate === "Every Tuestday"){
    japaniCourseStartDate = "毎週火曜日";
  } else if(publicData.courseStartDate === "Every Wednesday"){
    japaniCourseStartDate = "毎週水曜日";
  } else if(publicData.courseStartDate === "Every Thursday"){
    japaniCourseStartDate = "毎週木曜日";
  } else if(publicData.courseStartDate === "Every Friday"){
    japaniCourseStartDate = "毎週金曜日";
  } else if(publicData.courseStartDate === "Every Saturday"){
    japaniCourseStartDate = "毎週土曜日";
  } else if(publicData.courseStartDate === "Every Sunday"){
    japaniCourseStartDate = "毎週日曜日";
  } else {
    japaniCourseStartDate = publicData.courseStartDate;
  }


  let japaniClassDaysStart;
  if(publicData.classDaysStart === "Sunday"){
    japaniClassDaysStart = "日曜日";
  } else if(publicData.classDaysStart === "Monday"){
    japaniClassDaysStart = "月曜日";
  } else if(publicData.classDaysStart === "Tuesday"){
    japaniClassDaysStart = "火曜日";
  } else if(publicData.classDaysStart === "Wednesday"){
    japaniClassDaysStart = "水曜日";
  } else if(publicData.classDaysStart === "Thursday"){
    japaniClassDaysStart = "木曜日";
  } else if(publicData.classDaysStart === "Friday"){
    japaniClassDaysStart = "金曜日";
  } else if(publicData.classDaysStart === "Saturday"){
    japaniClassDaysStart = "土曜日";
  } else {
    japaniClassDaysStart = publicData.classDaysStart;
  }


  let japaniClassDaysEnd;
  if(publicData.classDaysEnd === "Sunday"){
    japaniClassDaysEnd = "日曜日";
  } else if(publicData.classDaysEnd === "Monday"){
    japaniClassDaysEnd = "月曜日";
  } else if(publicData.classDaysEnd === "Tuesday"){
    japaniClassDaysEnd = "火曜日";
  } else if(publicData.classDaysEnd === "Wednesday"){
    japaniClassDaysEnd = "水曜日";
  } else if(publicData.classDaysEnd === "Thursday"){
    japaniClassDaysEnd = "木曜日";
  } else if(publicData.classDaysEnd === "Friday"){
    japaniClassDaysEnd = "金曜日";
  } else if(publicData.classDaysEnd === "Saturday"){
    japaniClassDaysEnd = "土曜日";
  } else {
    japaniClassDaysEnd = publicData.classDaysEnd;
  }

  const selectedOptions = publicData && publicData.amenities ? publicData.amenities : [];
  return (
    <div className={css.sectionFeatures}>
      <div className={css.featuresTitle}>
        <TableHeading>コース詳細</TableHeading>
      </div>
      {/*<PropertyGroup
        id="ListingPage.amenities"
        options={options}
        selectedOptions={selectedOptions}
        twoColumns={true}
      />*/}
      <div className={css.listSection}>
        <div className={css.box}>
          <div className={css.title}>受講可能期間</div>
          <div className={css.details}>
            {publicData.minDuration} 年中
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>受講可能レベル</div>
          <div className={css.details}>
            {japaniRequiredLevel}
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>コース開始日</div>
          <div className={css.details}>
            {japaniCourseStartDate}
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>１週間のコマ数</div>
          <div className={css.details}>
          {publicData.classesPerWeek * publicData.maxDuration} 〜 {publicData.classesPerWeek * publicData.minDuration}コマ
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>１コマあたりの時間</div>
          <div className={css.details}>
            {publicData.lessionDuration} 分
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>クラススケジュール</div>
          <div className={css.details}>
            <div>{japaniClassDaysStart} 9:00~</div>
            <div>{japaniClassDaysEnd} 10:00~</div>          
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>最低就学年齢</div>
          <div className={css.details}>
          {publicData.minReqAge}
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>１クラスの人数</div>
          <div className={css.details}>
            {publicData.avgStudentPerClass}
          </div>
        </div>
        <div className={css.box}>
          <div className={css.title}>スクールホリデー</div>
          <div className={css.details}>
            スクールホリデー
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionFeaturesMaybe;
