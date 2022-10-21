import React from 'react'
import css from './TableHeading.module.css'

function TableHeading({children}) {
  return (
        <h2 className={css.table_heading}>{children}</h2>
  )
}

export default TableHeading