import React from 'react'
import css from './FirstTable.module.css'

const FirstTable = () => {
  return (
            <div className={css.sec_table}>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>作成日</p></div>
                        <div><p>2022/07/04</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>就学週数</p></div>
                        <div><p>4週</p></div>
                    </div>
                </div>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>国名</p></div>
                        <div><p>country_name</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>学校開始日</p></div>
                        <div><p>school_start_day</p></div>
                    </div>
                </div>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>エリア名</p></div>
                        <div><p>city_name</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>滞在方法</p></div>
                        <div><p>stay_way</p></div>
                    </div>
                </div>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>語学学校名</p></div>
                        <div><p>School_name</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>滞在週数</p></div>
                        <div><p>stay_week</p></div>
                    </div>
                </div>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>コース名</p></div>
                        <div><p>course_name</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>滞在開始日</p></div>
                        <div><p>stay_start_day</p></div>
                    </div>
                </div>

                <div className={css.first_row}>
                    <div className={css.sec_row}>
                        <div><p>適用レート</p></div>
                        <div><p>1$=￥130 rate<br />
                                ※レートは変動します。最新のレート<br/>を確認してください。</p></div>
                    </div>
                    <div className={css.sec_row}>
                        <div><p>空港送迎</p></div>
                        <div><p>あり/なし</p></div>
                    </div>
                </div>                
            </div>
  )
}

export default FirstTable