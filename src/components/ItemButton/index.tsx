import styles from './style.module.scss'
import { Link } from 'react-router-dom'
import { FiHeadphones, FiMoreVertical, FiRadio } from 'react-icons/fi'

import Medic from '../../images/medic.svg'
import Clock from '../../images/clock.svg'
import Gym from '../../images/Gym.svg'
import { ButtonHTMLAttributes } from 'react'
import { useLoading } from '../../contexts/LoadingContext'

interface ActivityItemProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  title : string,
  description : string,
  icons : "music" | "gym" | "medic" | "clock",
  page : string
}
const icon = {
  music: <FiHeadphones size={30} color="#fff"/>,
  gym: <img src={Gym} alt="" style={{ width: 30, height: 30 }}/>,
  medic : <img src={Medic} alt="" style={{ width: 30, height: 30 }}/>,
  clock : <img src={Clock} alt="" style={{ width: 30, height: 30 }}/>
}

export function Item({ title, description, icons, page }: ActivityItemProps){
  const { setLoadingTrue } = useLoading()
  return(
    <Link to={`/${page}`}>
      <div className={styles.container} onClick={setLoadingTrue}>
        <div className={styles.icon}>
          {icon[icons]}
        </div>

        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div/>
      </div>
    </Link>
  )
}