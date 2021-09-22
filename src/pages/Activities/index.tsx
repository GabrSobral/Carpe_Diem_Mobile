import { useEffect, useState } from 'react'
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

  return(
    <div className={styles.container}>
       <Header 
        GoBackIsActive={false} 
        setIsVisibleToFalse={() => setIsVisible(false)}
      />
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, bounce: 0 }}
          >
            <div className={styles.activityTitle}>
              <div className={styles.content}>
                <h2>Atividades</h2>
                <p>Aqui você pode encontrar atividades <br/>que serão geradas diariamente</p>
              </div>
            </div>
            
            <section className={styles.allActivities}>
              {activities?.length !== 0 ? (
                activities.map(activity => (
                  <ActivityItem 
                    key={activity.id}
                    activity={activity}
                    setIsVisibleToFalse={() => setIsVisible(false)}
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
          </motion.main>
        )}
      </AnimatePresence>
      <BottomMenu pageActive='activities'/>
    </div>
  )
}