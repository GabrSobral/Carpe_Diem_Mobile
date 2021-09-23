import styles from './style.module.scss'
import { useHistory } from 'react-router-dom'
import { FiHeadphones } from 'react-icons/fi'

import Medic from '../../images/medic.svg'
import Clock from '../../images/clock.svg'
import Gym from '../../images/Gym.svg'
import { ButtonHTMLAttributes } from 'react'

interface ActivityItemProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  title : string,
  description : string,
  icons : "music" | "gym" | "medic" | "clock",
  page : string;
  setIsVisibleToFalse: () => void;
}
const icon = {
  music: <FiHeadphones size={30} color="#fff"/>,
  gym: <img src={Gym} alt="" style={{ width: 30, height: 30 }}/>,
  medic : <img src={Medic} alt="" style={{ width: 40, height: 40 }}/>,
  clock : <img src={Clock} alt="" style={{ width: 40, height: 40 }}/>
}

export function Item({ 
  title, 
  description, 
  icons, 
  page,
  setIsVisibleToFalse }: ActivityItemProps){
    const history = useHistory()
  return(
    <button 
      className={styles.itemButtom}
      type="button"
      onClick={() => {
        setIsVisibleToFalse()
        history.push(`/${page}`)
      }}
    >
      <div className={styles.container}>
        <div className={styles.icon}>
          {icon[icons]}
        </div>

        <div className={styles.content}>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>

        <div/>
      </div>
    </button>
  )
}