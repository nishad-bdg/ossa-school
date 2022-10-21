import React from 'react'
import css from './FourTable.module.css'

const FourTable = () => {
  return (
                <div className={css.sec_table}>
                    <div className={css.first_row}>
                        <div className={css.sec_row}>
                            <div><p>空港送迎費用</p></div>
                            <div><p>＄1500</p></div>
                        </div>
                        <div><p>￥103,040</p></div>
                    </div>
                    <div className={css.first_row}>
                        <div className={css.sec_row}>
                            <div><p>現地サポート費用</p></div>
                            <div><p>＄1500</p></div>
                        </div>
                        <div><p>￥103,040</p></div>
                    </div>
                </div>
  )
}

export default FourTable