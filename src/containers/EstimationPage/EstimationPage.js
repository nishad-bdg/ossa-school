import React from 'react'
import { Footer } from '../../components'
import TopbarContainer from '../TopbarContainer/TopbarContainer'
import css from './Estimation.module.css'
import EstimationContent from './EstimationContent.js/EstimationContent'

const EstimationPage = () => {
  return (
    <div>
        <TopbarContainer />        
        <EstimationContent />
        <Footer />
    </div>
  )
}

export default EstimationPage