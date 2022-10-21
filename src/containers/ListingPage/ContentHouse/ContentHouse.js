import React from 'react'
import TableHeading from '../../EstimationPage/CustomComponent/TableHeading'
import img from './images/home-group-img.jpg'
import moneyIcon from './images/janai-money-icon.svg'
import css from './ContentHouse.module.css'

const ContentHouse = () => {
  const arr = [1,2,3]
  return (
  <>
  <TableHeading>宿泊先情報</TableHeading> 
    {
      arr.map(data => <div key={data} className={css.content_house_div}>
        <div className={css.img_div}>
              <img src={img} alt="" />
        </div>
            <div className={css.table_text_div}>
              <h2>House name</h2>
              <div className={css.table_text_single_div}>
                  <div className={css.table_text}>
                      <div className={css.title}>部屋タイプ</div>
                      <div className={css.details}>部屋タイプ部屋タイプ部屋タイプ部屋タイプ</div>
                  </div>
                  <div className={css.table_text}>
                      <div className={css.title}>食事タイプ</div>
                      <div className={css.details}>食事タイプ食事タイプ食事タイプ</div>
                  </div>
                  <div className={css.table_text}>
                      <div className={css.title}>学校までの距離</div>
                      <div className={css.details}>学校までの距離学校までの距離</div>
                  </div>
                  <div className={css.table_text}>
                      <div className={css.title}>ハイシーズン期間</div>
                      <div className={css.details}>ハイシーズン期間〜ハイシーズン期間</div>
                  </div>
                  <div className={css.table_text}>
                      <div className={css.title}>ハイシーズン費用</div>
                      <div className={css.details}>ハイシーズン費用</div>
                  </div>
              </div>
              <div className={css.money_div}>
                    <div>
                      <img src={moneyIcon} alt="" />
                    </div>
                    <div className={css.money_text}>$2,500</div>
              </div>
            </div>
    </div>)
    }
    </>
  )
}

export default ContentHouse