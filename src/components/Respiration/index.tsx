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
  
  let timeOutFunction : NodeJS.Timeout
  
  function handleStartClock(){
    setIsClockStarted(!isClockStarted)
    isClockStarted ? setIsFirst(0) : setIsFirst(1)
    // setIsFinished(false)
    clearTimeout(timeOutFunction)
  }
  
  useEffect(()=> {
    let insideTimeout = timeOutFunction
    if(isFirst === 1){
      setIsFirst(isFirst + 1)
      setIsFinished(true)
      clearTimeout(insideTimeout)
      setRespirationSize(100)
      setMessage("Inspire...")
    }
    if(isFirst === 0){
      setIsFirst(isFirst + 2)
      setIsFinished(true)
      setRespirationSize(0.0001)
      clearTimeout(insideTimeout)
      setMessage("Pausado...")
    }
    if(isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(false)
        setRespirationSize(0)
        setMessage("Expire...")
      }, 7000)
    } else if(!isFinished && isClockStarted){
      insideTimeout = setTimeout(() => {
        setIsFinished(true)
        setRespirationSize(100)
        setMessage("Inspire...")
      }, 7000)
    }
    return () => clearTimeout(insideTimeout)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[respirationSize, isClockStarted])

  return(
    <main className={styles.MainContainer}>
      <div className={styles.respirationContainer}>
        <h2 className={styles.instruction}>
          {message}
        </h2>

        <div className={styles.RespirationAndTimerContainer}>
          <div className={styles.circleRespirationContainer}>
            <div 
            style={{ 
              width: `${respirationSize}%`, 
              height: `${respirationSize}%`,
              transition: isClockStarted ? "7s" : '0.3s'
              }}/>
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
    </main>
  )
}