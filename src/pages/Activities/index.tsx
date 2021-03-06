import { useEffect, useMemo, useState } from 'react'
import { FiFrown } from 'react-icons/fi'
import { AnimatePresence, motion } from 'framer-motion'

import { ActivityItem } from '../../components/ActivityItem'
import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'

import { useActivity } from '../../contexts/ActivityContext'

import styles from './styles.module.scss'

export const Activities: React.FC = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const { activities } = useActivity()

  useEffect(()=> { setIsVisible(true) },[])

  const memoizedHeader = useMemo(()=>(
    <Header 
      GoBackIsActive={false} 
      setIsVisibleToFalse={() => setIsVisible(false)}/>
  ),[])
  const memoizedMainTitle = useMemo(()=> (
    <div className={styles.activityTitle}>
      <div className={styles.content}>
        <h2>Atividades</h2>
        <p>Aqui você pode encontrar atividades <br/>que serão geradas diariamente</p>
      </div>
    </div>
  ),[])
  const memoizedAllActivities = useMemo(()=>(
    <section className={styles.allActivities}>
      {activities?.length !== 0 ? (
        activities.map(activity => (
          <ActivityItem 
            key={activity.id}
            activity={activity}
          />
        ))
        )
        : (
        <div className={styles.dontHaveActivitiesContainer}>
          <FiFrown color="#bbb" size={86}/>
          <span>Não há atividades para realizar.</span>
        </div>
      )}
    </section>
  ),[activities])
  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='activities'/>
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
            {memoizedMainTitle}
            
            {memoizedAllActivities}
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}