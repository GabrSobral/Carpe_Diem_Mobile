import { FiFrown } from 'react-icons/fi'
import { IonPage } from '@ionic/react'

import { ActivityItem } from '../../components/ActivityItem'
import { Header } from '../../components/header'

import { useActivity } from '../../contexts/ActivityContext'

import styles from './styles.module.scss'

export const Activities: React.FC = () => {
  const { activities } = useActivity()

  return(
    <IonPage>
      <div className={styles.container}>
        <Header GoBackIsActive={false}/>
        <main>
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
        </main>
      </div>
    </IonPage>
  )
}