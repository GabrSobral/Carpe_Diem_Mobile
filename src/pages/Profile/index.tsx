import { useCallback, useState } from 'react'
import { IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'
import { FiLogOut} from 'react-icons/fi';
// import { format } from 'date-fns'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { Modal } from '../../components/Modal'

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';
import { ChangeQuantityModal } from '../../components/QuantityActivitiesModal';
import { ConfigContainer } from '../../components/ConfigContainer';

export const Profile: React.FC = () => {
  const history = useHistory()
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const [ isQuantityModalVisible, setIsQuantityModalVisible ] = useState(false)

  const { Logout, user } = useUsers()

  const logout = useCallback(() => {
    Logout().then(() => { history.push('/SignIn') })
  },[history, Logout])

  return(
    <IonPage>
      <div className={styles.container}>
        <AnimatePresence exitBeforeEnter>
          { isLogoutModalVisible && (
            <Modal
              title={`Volte sempre ${': )'}`}
              description="Você tem certeza de que deseja sair do nosso app?"
              keyModal="Logout"
              setIsVisible={setIsLogoutModalVisible}
              yesAndNoButtons={true}
              confirmFunction={logout}
            />
          ) }
        </AnimatePresence>

          <AnimatePresence exitBeforeEnter>
            { isQuantityModalVisible && (
              <ChangeQuantityModal 
                setIsVisible={setIsQuantityModalVisible}
                initialValue={Number(user?.quantity_of_activities)}
              />
            ) }
          </AnimatePresence>

        <Header 
          GoBackIsActive={false} 
          setIsVisibleToFalse={() => {}}
        />

        <main>
          <section className={styles.headerUserContainer}>
            <div className={styles.ImageAndNameContainer}>
              <img src="https://github.com/c-santana4.png" alt="Minha foto de perfil" />
              <span>{user?.name}</span>
            </div>

            <span className={styles.registeredAt}>Registrado em: {user?.created_at}</span>
          </section>

          <section className={styles.BottomInfoContainer}>
            <div className={styles.allActivitiesComplete}>
              <span>Atividades completas:</span>
              <span>{user?.all_activities_finished}</span>
            </div>

            <ConfigContainer
              setIsVisibleToFalse={() => {}}
              setQuantityModalToVisible={() => setIsQuantityModalVisible(true)}
            />
            <button type='button' className={styles.logoutButton} onClick={()=> setIsLogoutModalVisible(true)}>
              Sair
              <FiLogOut size={35} color="#EF4040"/>
            </button>
          </section>
        </main>
        <BottomMenu pageActive='me'/>
      </div>
    </IonPage>
  )
}