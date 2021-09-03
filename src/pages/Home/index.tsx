import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useHistory } from 'react-router';

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { LoadingStatus } from '../../components/LoadingStatus';
import { Item } from '../../components/ItemButton';

import { useLoading } from '../../contexts/LoadingContext';
import { useActivity } from '../../contexts/ActivityContext';

import styles from './styles.module.scss'

export const Home: React.FC = () => {
  const history = useHistory()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, closeLoading } = useLoading()
  const [ percentage , setPercentage ] = useState(0)
  const { activitiesToday, setActivitiesTodayState } = useActivity()
  const y = useMotionValue(0)

  useEffect(() => { 
    closeLoading()
    setIsVisible(true) 
  },[closeLoading])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive={false}/>
  ),[])

  const memoizedProgressBar = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Tarefas concluídas hoje</h2>

      <div className={styles.progressBarContainer}>
        <CircularProgressbar 
          value={percentage} 
          text={activitiesToday >= 0 ? `${activitiesToday}/5` : "..."}
          className={styles.circularProgressBar}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: "#54A06A",
            textColor: "#434343"
          })}
        />
      </div>
    </section>
  ),[percentage, activitiesToday])

  const memoizedPagesControl = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Descubra</h2>
      <Item
        title="Respire e se acalme"
        description="Faça exercícios de respiração para se acalmar."
        icons="clock"
        page="Clock"
      />
    </section>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='home'/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {memoizedProgressBar}

            {memoizedPagesControl}
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}