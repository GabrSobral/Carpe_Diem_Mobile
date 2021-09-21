import { useEffect, useMemo, useState, useCallback } from 'react'
import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion'
import { useHistory } from 'react-router-dom'
// import { FiHeadphones, FiTrash, FiCheck, FiBook } from 'react-icons/fi'

import { BottomMenu } from '../../components/BottomMenu'
import { Header } from '../../components/header'
import { Player } from '../../components/Player'

// import Medic from '../../images/medic.svg'
// import Clock from '../../images/clock.svg'
// import Gym from '../../images/Gym.svg'
// import Games from '../../images/games.svg'
// import Food from '../../images/food.svg'
// import Respiration from '../../images/respiration.svg'
// import Meditation from '../../images/meditation.svg'

import { useActivity } from '../../contexts/ActivityContext'
import { Modal } from '../../components/Modal'

import styles from './styles.module.scss'
import { api } from '../../services/api'

// const icon = {
//   Musica: <FiHeadphones size={30} color="#fff"/>,
//   Exercicios: <img src={Gym} alt="" style={{ width: 30, height: 30 }}/>,
//   Games : <img src={Games} alt="" style={{ width: 30, height: 30 }}/>,
//   Meditacao: <img src={Meditation} alt="" style={{ width: 30, height: 30 }}/>,
//   Culinaria: <img src={Food} alt="" style={{ width: 30, height: 30 }}/>,
//   Respiracao: <img src={Respiration} alt="" style={{ width: 30, height: 30 }}/>,
//   Estudos: <FiBook size={30} color="#fff"/>,
//   medic : <img src={Medic} alt="" style={{ width: 30, height: 30 }}/>,
//   clock : <img src={Clock} alt="" style={{ width: 30, height: 30 }}/>
// }

export const ActivityDetails: React.FC = () => {
  const [ isVisible, setIsVisible ] = useState(false)
  const [ isModalSuccessVisible, setIsModalSuccessVisible ] = useState(false)
  const [ isModalRemoveVisible, setIsModalRemoveVisible ] = useState(false)
  const { selectedActivity, handleUpdateActivitiesState, handleFinishActivity } = useActivity()
  
  const history = useHistory()

  useEffect(()=> { setIsVisible(true) },[])
  useEffect(() => {
    if(!selectedActivity) {
      history.push('/Activities')
    }
  },[selectedActivity, history])

  const Finish = useCallback(async () => {
    handleFinishActivity(selectedActivity?.id || '')
    setIsModalSuccessVisible(true)
  },[setIsModalSuccessVisible, selectedActivity?.id, handleFinishActivity])

  const ExcludeActivity = useCallback(async () => {
    await api.delete(`/activity/my-delete/${selectedActivity?.id}`)
    handleUpdateActivitiesState(String(selectedActivity?.id))
    setIsModalRemoveVisible(false)
    setTimeout(() => history.push('/activities'), 300)
  },[setIsModalRemoveVisible, history, selectedActivity?.id, handleUpdateActivitiesState])
  
  const MemoizedModalExclude = useMemo(()=>(
    <AnimatePresence>
      { isModalRemoveVisible && (
        <Modal
          title="Oh não..."
          description="Você tem certeza de que deseja descartar essa tarefa?"
          keyModal="Exclude"
          setIsVisible={setIsModalRemoveVisible}
          yesAndNoButtons={true}
          confirmFunction={ExcludeActivity}
          image="Exclude"
          destinyPage="Activities"
        />
      ) }
    </AnimatePresence>
  ),[isModalRemoveVisible, ExcludeActivity])

  const MemoizedModalSuccess = useMemo(()=>(
    <AnimatePresence exitBeforeEnter>
      { isModalSuccessVisible && (
        <Modal
          title="Parabéns!"
          description="Você conseguiu realizar uma tarefa, isso é ótimo!"
          keyModal="Success"
          setIsVisible={setIsModalSuccessVisible}
          yesAndNoButtons={false}
          image="Success"
          destinyPage="Activities"
        />
      ) }
    </AnimatePresence>
  ),[isModalSuccessVisible])

  const memoizedDetails = useMemo(()=>(
    <>
      <div className={styles.activityItem}>
        <div className={styles.icon}>
          {/* {icon[String(selectedActivity?.category.name)]} */}
        </div>

        <div className={styles.content}>
          <h2>{selectedActivity?.title}</h2>
          <p>{selectedActivity?.description}</p>
        </div>
      </div>

      <div 
        className={styles.ActivityDescription} 
        dangerouslySetInnerHTML={{
          __html: selectedActivity?.description as string
        }}
      >
      </div>
    </>
  ),[selectedActivity])

  const memoizedHeader = useMemo(()=>(
    <Header 
      GoBackIsActive={true} 
      setIsVisibleToFalse={() => setIsVisible(false)}/>
  ),[])

  const memoizedBottomMenu = useMemo(()=>(
    <BottomMenu pageActive='activities'/>
  ),[])

  const memoizedButtonsControl = useMemo(()=>(
    <div className={styles.buttons}>
      <button type="button" onClick={() => setIsModalRemoveVisible(true)}>
        Descartar
      </button>

      <button type="button" onClick={Finish}>
        Concluir
      </button>
    </div>
  ),[Finish, setIsModalRemoveVisible])

  return(
    <div className={styles.container}>
      {memoizedHeader}

      {MemoizedModalSuccess}

      {MemoizedModalExclude}

      <AnimateSharedLayout type="crossfade">
        
        <AnimatePresence exitBeforeEnter>
          {isVisible && (
            <motion.main
              key="ActivityDetails"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0}}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.3, bounce: 0 }}
            >    
              {memoizedDetails}

              {selectedActivity?.files.map(item => {
              
                if(item.format === "mp4"){
                  return(
                    <motion.video 
                      controls 
                      className={styles.video} 
                      key={item.id}
                      initial={{ opacity: 0}}
                      animate={{ opacity: 1}}
                    >
                      <source src={item.url} type="video/mp4"/>
                      Your browser does not support the video tag.
                    </motion.video>
                  )
                }
      
                if(item.format === "mp3"){
                  return(
                    <div key={item.id}>
                      <strong>Nós recomendamos essa música</strong>
                      <Player 
                        name={item.name || ''}
                        url={item.url || ''}
                        duration={item.duration || 0}
                      />
                    </div>
                  )
                }
      
                if(item.format === "png"){
                  return(
                    <div className={styles.image} key={item.id}>
                      <img 
                        key={item.id}
                        src={item.url} 
                        alt="Imagem do arquivo" 
                        width={"100%"}
                        height={"fit-content"}
                    />
                    </div>
                    
                  )
                }
                return <p key={item.id}/>
              })}
              {memoizedButtonsControl}
            </motion.main>
          )}
        </AnimatePresence>
        {memoizedBottomMenu}
      </AnimateSharedLayout>
    </div>
  )
}