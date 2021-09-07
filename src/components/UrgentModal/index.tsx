import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState, Dispatch } from 'react'
import emergencySVG from '../../images/emergency.svg'
// import { useHistory } from 'react-router-dom'

import styles from '../Modal/style.module.scss'

interface iUrgentModalProps {
  setIsVisible: Dispatch<React.SetStateAction<boolean>>;
  confirmFunction: () => void;
}

export function UrgentModal(
  { setIsVisible, confirmFunction }: iUrgentModalProps) {
    const [ percentage, setPercentage ] = useState(0)
    const transSeconds = 10
  // const history = useHistory()

  useEffect(() => {
    setPercentage(100)
    const timer = setTimeout(() => {
      alert('Protocolo iniciado')
    },transSeconds * 1000)

    return () => clearTimeout(timer)
  },[])

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
                onClick={confirmFunction}
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