import { useState } from 'react'
import ReactDOM from 'react-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { IonHeader } from '@ionic/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import { UrgentModal } from '../UrgentModal'
import { useUsers } from '../../contexts/UserContext'

import UrgentSVG from '../../images/urgent.svg'
import styles from './style.module.scss'

interface HeaderProps{
  GoBackIsActive : boolean;
  homeButtonVisible?: boolean;
}

export function Header({ 
  GoBackIsActive, 
  homeButtonVisible = true } : HeaderProps){
  const history = useHistory()
  const [ isUrgentModalVisible, setIsUrgentModalVisible ] = useState(false)
  const [ IsGobackActive, setIsGoBackActive ] = useState(GoBackIsActive)
  const { username } = useUsers()

  return(
    <IonHeader className={styles.container}>
      {ReactDOM.createPortal(
        <AnimatePresence exitBeforeEnter>
          {isUrgentModalVisible && 
          <UrgentModal setIsVisible={setIsUrgentModalVisible}/>}
        </AnimatePresence>,
        document.body
      ) }
      <div className={styles.name}>
        <AnimatePresence>
          {IsGobackActive && (
            <motion.button 
              onClick={() => {
                setIsGoBackActive(false)
                history.goBack()
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
    
      <button  
        type='button' 
        className={styles.urgentButton} 
        onClick={()=> setIsUrgentModalVisible(!isUrgentModalVisible)}
      >
        <img src={UrgentSVG} alt="Clique em caso de crise" />
      </button>
    </IonHeader>
  )
}
