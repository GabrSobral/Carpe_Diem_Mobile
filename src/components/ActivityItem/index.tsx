import { ButtonHTMLAttributes } from 'react'
import { FiBook, FiHeadphones, FiMoreVertical, } from 'react-icons/fi'

import Medic from '../../images/medic.svg'
import Clock from '../../images/clock.svg'
import Gym from '../../images/Gym.svg'
import Games from '../../images/games.svg'
import Food from '../../images/food.svg'
import Respiration from '../../images/respiration.svg'
import Meditation from '../../images/meditation.svg'
import { useLoading } from '../../contexts/LoadingContext'

import styles from './style.module.scss'
import { ActivitiesProps, useActivity } from '../../contexts/ActivityContext'
import { useHistory } from 'react-router'

interface ActivityItemProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  activity: ActivitiesProps;
}

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

export function ActivityItem({ activity }: ActivityItemProps){
  const { setLoadingTrue } = useLoading()
  const { setSelectedActivityState } = useActivity()
  const history = useHistory()

  return(
    <button 
    className={styles.container} 
    onClick={() => {
      setSelectedActivityState(activity)
      history.push('/ActivityDetails')
      setLoadingTrue()
    }}>
      <div className={styles.icon}>
        {/* {icon[icons]} */}
        <div/>
      </div>

      <div className={styles.content}>
        <h2>{activity.title}</h2>
        <p>{activity.description}</p>
      </div>

      <div>
        <FiMoreVertical size={30} color="#fff"/>
      </div>
    </button>
  )
}