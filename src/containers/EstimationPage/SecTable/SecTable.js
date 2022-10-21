import React from 'react'
import css from './SecTable.module.css'

const SecTable = () => {
  return (
 
            <div className={css.sec_table}>
                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>入学金</p></div>
                        <div><p>＄1500</p></div>
                    </div>
                    <div><p>￥103,040</p></div>
                </div>
                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>教材費</p></div>
                        <div><p>＄1500</p></div>
                    </div>
                    <div><p>￥103,040</p></div>
                </div>
                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>授業料</p></div>
                        <div><p>＄1500</p></div>
                    </div>
                    <div><p>￥103,040</p></div>
                </div>
            </div>
                
  )
}

export default SecTable