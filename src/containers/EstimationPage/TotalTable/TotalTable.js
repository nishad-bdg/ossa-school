import React from 'react'
import css from './TotalTable.module.css'

const TotalTable = () => {
  return (
    <div className={css.table_overFlow}>
                        <table className={css.total_table}>
                            <tr>
                                <td className={css.first_td_text}>留学費用合計</td>
                                <td className={css.first_td_num}>￥103,040</td>
                            </tr>
                            <tr>
                                <td className={css.sec_td_text}>ポイント即時利用</td>
                                <td className={css.sec_td_num}>￥103,040</td>
                            </tr>
                            <tr>
                                <td className={css.third_td_text}>留学費用合計</td>
                                <td className={css.third_td_num}>￥103,040</td>
                            </tr>
                        </table>
                    </div>
  )
}

export default TotalTable