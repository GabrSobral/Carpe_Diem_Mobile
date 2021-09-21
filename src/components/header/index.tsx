import { FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import styles from './style.module.scss'
import { useUsers } from '../../contexts/UserContext'
import { useState } from 'react'

interface HeaderProps{
  GoBackIsActive : boolean;
  setIsVisibleToFalse: () => void;
  homeButtonVisible?: boolean;
}

export function Header({ 
  GoBackIsActive, 
  setIsVisibleToFalse, 
  homeButtonVisible = true } : HeaderProps){
  const history = useHistory()
  const [ IsGobackActive, setIsGoBackActive ] = useState(GoBackIsActive)
  const { username } = useUsers()

  return(
    <header className={styles.container}>
      <div className={styles.name}>

        <AnimatePresence>
          {IsGobackActive && (
            <motion.button 
              onClick={() => {
                setIsVisibleToFalse()
                setIsGoBackActive(false)
                setTimeout(() => history.goBack(), 300)
              }}
              key="GoBackKey"
              type='button'
              initial={{ display: "none", opacity: 0 }}
              animate={{ display: "block", opacity: 1 }}
              transition={{ 
                delay: 0.2,
                duration: 0.2, 
                bounce: 0
              }}
            >
            <FiArrowLeft size={30} color="#434343"/>
          </motion.button>
          )}    
        
          <motion.h2
            initial={{ x: 0 }}
            animate={IsGobackActive ? { x: 50 } : { x: 0 }}
            key="GoBackWord"
            transition={{ 
              bounce: 0, 
              duration: 0.3, 
            }}
          >
            Olá, 
            <span>{username}</span>
          </motion.h2>
        </AnimatePresence>
      </div>
    
      { homeButtonVisible && (
        <span onClick={() => {
          setIsVisibleToFalse()
          setIsGoBackActive(false)
          setTimeout(() => history.replace('/Home'), 300)
        }}>Home</span>
      ) }

    </header>
  )
}
