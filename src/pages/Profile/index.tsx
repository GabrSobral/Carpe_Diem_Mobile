import { useCallback, useEffect, useMemo, useState } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion'
import { FiBook, FiLock, FiLogOut, FiSettings } from 'react-icons/fi';
// import { format } from 'date-fns'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { LoadingStatus } from '../../components/LoadingStatus';
import { Modal } from '../../components/Modal'

import { useLoading } from '../../contexts/LoadingContext';

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';

export const Profile: React.FC = () => {
  const history = useHistory()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, closeLoading, setLoadingTrue } = useLoading()
  const [ settingsIsVisible, setSettingsIsVisible ] = useState(false)
  const [ isLogoutModalVisible, setIsLogoutModalVisible ] = useState(false)
  const { Logout, user } = useUsers()

  const logout = useCallback(() => {
    Logout().then(() => { history.push('/SignIn') })
  },[history, Logout])
 
  useEffect(()=>{ setIsVisible(true) },[])
  useEffect(() => { closeLoading() },[ closeLoading ])

  const memoizedModalLogout = useMemo(()=>(
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
  ),[isLogoutModalVisible, logout])

  const memoizedHeader = useMemo(()=>(
    <Header GoBackIsActive/>
  ),[])

  const memoizedHeaderUser = useMemo(()=>(
    <section className={styles.headerUserContainer}>
      <div className={styles.ImageAndNameContainer}>
        <img src="https://github.com/c-santana4.png" alt="Minha foto de perfil" />
        <span>{user?.name}</span>
      </div>

      <span className={styles.registeredAt}>Registrado em: {user?.created_at}</span>
    </section>
  ),[user?.name, user?.created_at])

  const memoizedAllActivities = useMemo(()=>(
    <div className={styles.allActivitiesComplete}>
      <span>Atividades completas:</span>
      <span>{user?.all_activities_finished}</span>
    </div>
  ),[user?.all_activities_finished])

  const memoizedSettingsButton = useMemo(()=>(
    <div className={styles.configurationsContainer}>
      <button 
        type="button" 
        className={styles.configurationButton} 
        onClick={()=> setSettingsIsVisible(!settingsIsVisible)}
      >
        Configurações
        <FiSettings size={27} color="#534A4A"/>
      </button>

      <AnimatePresence>
      {settingsIsVisible && (
        <motion.div 
          key="SettingsButton"
          className={styles.hiddenButtons}
          initial={{ height: 0 }}
          animate={{ height: "fit-content"}}
          exit={{ height: 0 }}
        >
          <Link to="/Profile">
            <button type="button" onClick={()=> setLoadingTrue()}>
              Alterar questionário
              <FiBook size={20} color="#6f6b6b"/>
            </button>
          </Link>
          
          <Link to="/Profile">
            <button type="button" onClick={()=> setLoadingTrue()}>
              Alterar senha
              <FiLock size={20} color="#6f6b6b"/>
            </button>
          </Link>

        </motion.div>
      )}
      </AnimatePresence>
    </div>
  ),[settingsIsVisible, setLoadingTrue])

  const memoizedLogoutButton = useMemo(()=>(
    <button type='button' className={styles.logoutButton} onClick={()=> setIsLogoutModalVisible(true)}>
      Sair
      <FiLogOut size={35} color="#EF4040"/>
    </button>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='me'/>
  ),[])

  return(
    <div className={styles.container}>
      { isLoading && (<LoadingStatus/>) }
      { memoizedModalLogout }

      {memoizedHeader}
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Me"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {memoizedHeaderUser}

            <section className={styles.BottomInfoContainer}>
              {memoizedAllActivities}
              {memoizedSettingsButton}
              {memoizedLogoutButton}
            </section>
          </motion.main>
        )}
      </AnimatePresence>
      {memoizedBottomMenu}
    </div>
  )
}