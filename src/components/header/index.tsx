import { FiArrowLeft } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'

import styles from './style.module.scss'
import { useUsers } from '../../contexts/UserContext'

interface HeaderProps{
  GoBackIsActive : boolean
}

export function Header({ GoBackIsActive} : HeaderProps){
  const history = useHistory()
  const { username } = useUsers()
  const variants = {
    active: {
      x : [0, 50]
    },
    disable :{
      x: 0
    }
  }

  return(
    <header className={styles.container}>
      <div className={styles.name}>

        <AnimatePresence>
          {GoBackIsActive && (
            <motion.button 
              onClick={() => history.push('/Home')}
              key="GoBackKey"
              type='button'
              animate={{ 
                display: "block",
                opacity: [0, 1]
              }}
              transition={{ 
                delay: 0.5,
                duration: 0.5, 
                type: 'spring' 
              }}
            >
            <FiArrowLeft size={30} color="#434343"/>
          </motion.button>
          )}    
        
          <motion.h2
            animate={GoBackIsActive ? "active" : "disable"}
            key="GoBackWord"
            transition={{ 
              bounce: 0.5, 
              duration: 0.5, 
              type: 'spring' 
            }}
            variants={variants}
          >
            Olá, 
            <span>{username}</span>
          </motion.h2>
        </AnimatePresence>
      </div>
    </header>
  )
}
