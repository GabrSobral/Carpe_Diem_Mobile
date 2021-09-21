import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { Header } from '../../components/header'
import { Respiration } from '../../components/Respiration'

import styles from './styles.module.scss'

export const Clock: React.FC = () => {
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(()=> { setIsVisible(true) },[])

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={true} setIsVisibleToFalse={() => setIsVisible(false)}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && <Respiration key="RespirationKey"/> }
      </AnimatePresence>
    </div>
  )
}