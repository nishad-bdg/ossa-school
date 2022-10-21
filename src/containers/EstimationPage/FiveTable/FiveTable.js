import React from 'react'
import css from './FiveTable.module.css'

const FiveTable = () => {
  return (
                <div className={css.sec_table}>
                    <div className={css.first_row}>
                        <div><p>SSP申請費用</p></div>
                        <div><p>￥103,040</p></div>
                    </div>
                    <div className={css.first_row}>
                        <div><p>テキスト代</p></div>
                        <div><p>￥103,040</p></div>
                    </div>
                </div>
  )
}

export default FiveTable