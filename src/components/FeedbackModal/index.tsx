import { useEffect, useRef, useState } from "react"
import ReactDOM from 'react-dom'
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi'

import { useUsers } from "../../contexts/UserContext"
import { api } from "../../services/api"

import { motion, AnimatePresence } from 'framer-motion'
import { storage } from "../../utils/ionicStorage"

import styles from '../Modal/style.module.scss'
import { useActivity } from "../../contexts/ActivityContext"

interface FeedbackModalProps {
  initialValue?: boolean;
  setIsVisible: any
}

export function FeedbackModal({ initialValue, setIsVisible }: FeedbackModalProps){
  const [ feedback, setFeedback ] = useState(initialValue)
  // const { selectedActivity } = useActivity()
  const FeedbackRef: any = useRef(null)

  async function confirmFunction(){
    // await api.post('/feedback/new', 
    // { activity: selectedActivity?.id, feedback: true })
    
    setIsVisible(false)
  }
  useEffect(() => {
    function handleClickOutside(event: any){
      if(FeedbackRef.current && 
        !FeedbackRef.current.contains(event.target)) {
        setIsVisible(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [FeedbackRef, setIsVisible])

  return(
    <>
    {ReactDOM.createPortal(
      <motion.div className={styles.modalBackground}
        key={`modalChangeQuantityBackground`}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
      >
        <AnimatePresence key={`APFeedback`}>
          <motion.div className={styles.modalContainer}
            key={`modalFeedback`}
            ref={FeedbackRef}
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
              <h2>Sua opinião é muito importante para nós!</h2>
              <p>O que achou desta atividade?</p>
            </div>

            <div className={styles.feedbackButtonsContainer}>
              <button 
                type="button"
                onClick={() => setFeedback(true)}
                className={`${styles.like} ${feedback === true && styles.activeFeedback}`}
              >
                <FiThumbsUp className={`${styles.buttonFeedbackIcons}`}/>
                Gostei
              </button>
              
              <button 
                type="button" 
                onClick={() => setFeedback(false)}
                className={`${styles.dislike} ${feedback === false && styles.activeFeedback}`}
              >
                <FiThumbsDown className={`${styles.buttonFeedbackIcons}`}/>
                Não gostei
              </button>
            </div>

            <button 
              type="button" 
              onClick={confirmFunction}
              className={styles.finishButton}
            >   
              Dar feedback
            </button>
          </motion.div>
        </AnimatePresence>
      </motion.div>,
      document.body
    )}
    </>
  )
}