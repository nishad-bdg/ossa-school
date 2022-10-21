import React from 'react'
import TableHeading from '../CustomComponent/TableHeading'
import FirstTable from '../FirstTable/FirstTable'
import FiveTable from '../FiveTable/FiveTable'
import FourTable from '../FourTable/FourTable'
import SecTable from '../SecTable/SecTable'
import ThirdTable from '../ThirdTable/ThirdTable'
import TotalTable from '../TotalTable/TotalTable'
import css from './EstimationContent.module.css'

const EstimationContent = () => {
  return (
    <>
    <div className={css.top_background}>
        <div className='container'>
            <div className={css.custom_container}>
                    <p className={css.top_heading}>お見積り結果</p>
                    <div className={css.blue_line}></div>
                    <p className={css.top_small_text}>お見積りの結果はマイページからもご確認いただくことができます</p>
            </div>
        </div>
    </div>
    <div className={css.white_background}>
        <div className='container'>
            <div>
                <p className={css.mobile_top_heading}>語学学校|コース|見積もり</p>
            </div>
            <div className={css.text_container}>
                    <TableHeading>概要</TableHeading>                   
                    <FirstTable />    
            </div>
            <div className={css.sec_table}>
                <TableHeading>語学学校関連費用</TableHeading>
                <SecTable />
            </div>
            <div className={css.sec_table}>
                <TableHeading>宿泊先関連費用</TableHeading>
                <ThirdTable />
            </div>
            <div className={css.sec_table}>
                <TableHeading>その他オプション</TableHeading>
                <FourTable />
            </div>
            <div className={css.total_table_div}>
                <TotalTable />
            </div>
            <div className={css.five_table_div}>
                <TableHeading>現地支払い費用概算</TableHeading>
                <FiveTable />
            </div>
            <div className={css.table_btn}>
                <button>この見積もりをダウンロードする</button>
                <button>この内容で申し込む</button>
            </div>
        </div>
    </div>
    </>
  )
}

export default EstimationContent