import React from 'react'
import css from './ThirdTable.module.css'

const ThirdTable = () => {
  return (
                       <div className={css.sec_table}>
                            <div className={css.first_row}>
                                <div className={css.sec_row}>
                                    <div><p>滞在手配費</p></div>
                                    <div><p>＄1500</p></div>
                                </div>
                                <div><p>￥103,040</p></div>
                            </div>
                            <div className={css.first_row}>
                                <div className={css.sec_row}>
                                    <div><p>滞在費</p></div>
                                    <div><p>＄1500</p></div>
                                </div>
                                <div><p>￥103,040</p></div>
                            </div>
                            <div className={css.first_row}>
                                <div className={css.sec_row}>
                                    <div><p>ハイシーズン費用</p></div>
                                    <div><p>＄1500</p></div>
                                </div>
                                <div><p>￥103,040</p></div>
                            </div>
                        </div>                   
  )
}

export default ThirdTable