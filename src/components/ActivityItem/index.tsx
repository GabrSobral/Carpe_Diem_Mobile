import { ButtonHTMLAttributes, HTMLProps } from 'react'
import { Link } from 'react-router-dom'
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

interface ActivityItemProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  title : string,
  description : string,
  icons : string,
  content : string
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

export function ActivityItem({ title, description, icons, content, id }: ActivityItemProps){
  const { setLoadingTrue } = useLoading()
  
  return(
    <Link to={`/Activity/ActivityDetails?title=${title}&description=${description}&icons=${icons}&content=${content}&id=${id}`}>
      <div className={styles.container} onClick={setLoadingTrue}>
        <div className={styles.icon}>
          {/* {icon[icons]} */}
        </div>

        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <button type="button">
          <FiMoreVertical size={30} color="#fff"/>
        </button>
      </div>
    </Link>
  )
}