import { Dispatch, useState } from 'react'
import ReactDOM from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'

import styles from '../Modal/style.module.scss'
import { api } from '../../services/api'
import { useUsers } from '../../contexts/UserContext'

interface ChangeQuantityModalProps {
  setIsVisible: Dispatch<React.SetStateAction<boolean>>;
  initialValue: number;
}

export function ChangeQuantityModal({ setIsVisible, initialValue } : ChangeQuantityModalProps) {
  const [ selectedValue, setSelectedValue ] = useState<number>(initialValue)
  const { handleUpdate } = useUsers() 

  async function confirmFunction(){
    await api.patch('/users', { quantity_of_activities: selectedValue })

    await handleUpdate({ quantity_of_activities: selectedValue })
      .then(() => setIsVisible(false))
  }

  return(
    <>
    {ReactDOM.createPortal(
      <motion.div className={styles.modalBackground}
        layout
        key={`modalChangeQuantityBackground`}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
        <AnimatePresence key={`APChangeQuantity`}>
          <motion.div className={styles.modalContainer}
            layout
            key={`modalChangeQuantity`}
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
            <div>
              <h2>Olá...</h2>
              <p>Selecione a quantidade de atividades diárias que você deseja 
                receber, <strong>a mudança será aplicada apenas amanhã.
              </strong></p>
            </div>
  
            <div className={styles.quantity_container}>
              <button 
                type="button"
                onClick={() => setSelectedValue(3)}
                className={selectedValue === 3 ? styles.active : ''}
                value={3}
              >3</button>
              
              <button 
                type="button" 
                onClick={() => setSelectedValue(4)}
                className={selectedValue === 4 ? styles.active : ''}
                value={4}
              >4</button>
  
              <button 
                type="button" 
                onClick={() => setSelectedValue(5)}
                className={selectedValue === 5 ? styles.active : ''}
                value={5}
              >5</button>
  
              <button 
                type="button" 
                onClick={() => setSelectedValue(6)}
                className={selectedValue === 6 ? styles.active : ''}
                value={6}
              >6</button>
            </div>
  
            <div className={styles.removeModalButton}>
              <button 
                type="button" 
                onClick={() => setIsVisible(false)}
                className={styles.yesAndNoButton}
              >
                Não
              </button>
  
              <button 
                type="button" 
                onClick={confirmFunction}
                className={styles.yesAndNoButton}
              >   
                Sim
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>,
      document.body
    )}
    </>
  )
}