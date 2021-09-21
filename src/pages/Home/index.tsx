import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiCheck } from 'react-icons/fi'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { Item } from '../../components/ItemButton';

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';

export const Home: React.FC = () => {
  const { user } = useUsers()
  const [ isVisible, setIsVisible ] = useState(false)
  const [ percentage , setPercentage ] = useState(0)

  useEffect(() => { setIsVisible(true) },[])

  useEffect(() => {
    const percentegeCalculated = Math.round(
      ((user?.activities_finished_today || 0) * 100) / (user?.quantity_of_activities || 0))
    setPercentage(percentegeCalculated)
  },[user?.activities_finished_today, user?.quantity_of_activities])

  const memoizedHeader = useMemo(()=>(
    <Header 
      GoBackIsActive={false} 
      setIsVisibleToFalse={() => setIsVisible(false)}
      homeButtonVisible={false}
    />
  ),[])

  const memoizedProgressBar = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Tarefas concluídas hoje</h2>

      <div className={styles.progressBarContainer}>
        <CircularProgressbar 
          value={percentage} 
          className={styles.circularProgressBar}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: "#54A06A",
            textColor: "#434343"
          })}
        />
        { (user?.activities_finished_today || 0) < (user?.quantity_of_activities || 0)  ? (
          <span className={styles.progressBarText}>
            {`${user?.activities_finished_today}/${user?.quantity_of_activities || 0}`}
          </span>) : (
            <FiCheck className={styles.progressCheckIcon}/>
          )}
      </div>
    </section>
  ),[percentage, user?.activities_finished_today, user?.quantity_of_activities])

  const memoizedPagesControl = useMemo(()=>(
    <section>
      <h2 className={styles.sectionTitle}>Confira também</h2>
      <Item
        title="Respire e se acalme"
        description="Faça exercícios de respiração para se acalmar."
        icons="clock"
        page="Clock"
        setIsVisibleToFalse={() => setIsVisible(false)}
      />
    </section>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='home'/>
  ),[])

  return(
    <div className={styles.container}>
      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, bounce: 0 }}
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