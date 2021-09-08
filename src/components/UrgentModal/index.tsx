import { AnimatePresence, motion } from 'framer-motion'
import { useCallback } from 'react'
import { useEffect, useState, Dispatch } from 'react'
import emergencySVG from '../../images/emergency.svg'
import { api } from '../../services/api'
// import { useHistory } from 'react-router-dom'

import styles from '../Modal/style.module.scss'

interface iUrgentModalProps {
  setIsVisible: Dispatch<React.SetStateAction<boolean>>;
}

export function UrgentModal(
  { setIsVisible }: iUrgentModalProps) {
    const [ percentage, setPercentage ] = useState(0)
    const transSeconds = 10
  // const history = useHistory()

  const startProtocol = useCallback(async () => {
    await api.post('/users/sms', { to: "5513991599324" })
    setIsVisible(false)
  },[setIsVisible])

  useEffect(() => {
    setPercentage(100)
    const timer = setTimeout(() => {
      startProtocol()
    },transSeconds * 1000)

    return () => clearTimeout(timer)
  },[startProtocol])

  return(
    <motion.div className={styles.modalBackground}
      layout
      key={`UrgentModalBackground`}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
    >
      <AnimatePresence key={`AP$UrgentModal`}>
        <motion.div className={styles.modalContainer}
          layout
          key={`UrgentModal`}
          animate={{
            scale : [0, 1],
            opacity:[0, 1]}}
          exit={{ scale : 0}}
          transition={{ 
            delay: 0.25,
            bounce: 0.5, 
            type: "spring", 
            duration: 0.3 }}
        >
          <img src={emergencySVG} alt="Imagem de alerta"/>
          <div>
            <h2>Alerta!</h2>
            <p>Você está prestes a iniciar o protocolo de emergência 
              para crises. <br/>O protocólo iniciará automaticamente 
              após o tempo de confirmação</p>
          </div>

          <div className={styles.sliderTimerContainer}>
            <div style={{ width: `${percentage}%`, transition: `${transSeconds}s` }}/>
          </div>

            <div className={styles.removeModalButton}>
              <button 
                type="button" 
                onClick={() => setIsVisible(false)}
                className={styles.yesAndNoButton}
              >
                Cancelar
              </button>

              <button 
                type="button" 
                onClick={startProtocol}
                className={styles.yesAndNoButton}
              >   
                Confirmar
              </button>
            </div>

        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}