import { motion, useMotionValue } from "framer-motion";
import { useEffect, useState } from "react";
import { FiPlay, FiX } from "react-icons/fi";
import { Timer } from "../Timer";
import styles from './style.module.scss'


export function Respiration(){
  const [ respirationSize, setRespirationSize ] = useState(0)
  const [ isClockStarted, setIsClockStarted ] = useState(false)
  const [ isFinished, setIsFinished ] = useState(false)
  const [ isFirst, setIsFirst ] = useState(10)
  const [ message, setMessage ] = useState('Começar')
  const y = useMotionValue(0)

  let timeOutFunction : NodeJS.Timeout

  function handleStartClock(){
    setIsClockStarted(!isClockStarted)
    isClockStarted ? setIsFirst(0) : setIsFirst(1)
    clearTimeout(timeOutFunction)
  }

  useEffect(()=> {
    if(isFirst === 1){
      setIsFirst(isFirst + 1)
      setIsFinished(!isFinished)
      clearTimeout(timeOutFunction)
      setRespirationSize(100)
      setMessage("Respire...")
    }
    if(isFirst === 0){
      setIsFirst(isFirst + 2)
      setIsFinished(!isFinished)
      setRespirationSize(0)
      clearTimeout(timeOutFunction)
      setMessage("Pausado...")
    }
    if(isFinished && isClockStarted){
      timeOutFunction = setTimeout(() => {
        setIsFinished(!isFinished)
        setRespirationSize(0)
        setMessage("Expire...")
      }, 7000)
    } else if(!isFinished && isClockStarted){
      timeOutFunction = setTimeout(() => {
        setIsFinished(!isFinished)
        setRespirationSize(100)
        setMessage("Respire...")
      }, 7000)
    }
    return () => clearTimeout(timeOutFunction)
  },[respirationSize, isClockStarted])

  return(
        <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
            className={styles.MainContainer}
          >
          <div className={styles.respirationContainer}>
              <motion.h2 
                className={styles.instruction}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity: 0}}
              >
                {message}
              </motion.h2>

            <div className={styles.RespirationAndTimerContainer}>
              <div className={styles.circleRespirationContainer}>
                <div style={{ width: `${respirationSize}%`, height: `${respirationSize}%` }}/>
              </div>
              
              <Timer isClockActive={isClockStarted}/>
            </div>

            <button 
              type="button" 
              onClick={handleStartClock} 
              className={!isClockStarted ? styles.ButtonActive : ""}
            >
              {
                isClockStarted ? (
                  <FiX size={42} color="#fff"/>
                ) : (
                  <FiPlay size={42} color="#fff"/>
                )
              }
            </button>
          </div>
        </motion.main>
  )
}