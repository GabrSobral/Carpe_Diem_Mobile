import { useEffect, useState } from 'react'
import { IonPage } from '@ionic/react'
import { FiCheck } from 'react-icons/fi'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { Header } from '../../components/header'
import { Item } from '../../components/ItemButton';

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';

export const Home: React.FC = () => {
  const { user } = useUsers()
  const [ percentage , setPercentage ] = useState(0)

  useEffect(() => {
    const percentegeCalculated = Math.round(
      ((user?.activities_finished_today || 0) * 100) / (user?.quantity_of_activities || 0))
    setPercentage(percentegeCalculated)
  },[user?.activities_finished_today, user?.quantity_of_activities])

  return(
    <IonPage>
      <div className={styles.container}>
        <Header 
          GoBackIsActive={false} 
          homeButtonVisible={false}
        />
        <main>
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

          <section>
            <h2 className={styles.sectionTitle}>Confira também</h2>
            <Item
              title="Respire e se acalme"
              description="Faça exercícios de respiração para se acalmar."
              icons="clock"
              page="Clock"
              setIsVisibleToFalse={() => {}}
            />
          </section>
        </main>
      </div>
    </IonPage>
  )
}