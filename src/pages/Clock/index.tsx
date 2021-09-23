import { IonPage } from '@ionic/react'

import { Header } from '../../components/header'
import { Respiration } from '../../components/Respiration'

import styles from './styles.module.scss'

export const Clock: React.FC = () => {
  return(
    <IonPage>
      <div className={styles.container}>
        <Header GoBackIsActive={true} setIsVisibleToFalse={() => {}}/>
        <Respiration key="RespirationKey"/>
      </div>
    </IonPage>
  )
}