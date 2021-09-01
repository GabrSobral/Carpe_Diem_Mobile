import { FiPlay } from 'react-icons/fi'
import styles from './style.module.scss'

export function Player(){
  return(
    <div className={styles.playerContainer}>
      <span>Nós recomendamos esta música.</span>

      <div className={styles.player}>
        <button type="button">
          <FiPlay size={30} color="#fff" fill="#fff"/>
        </button>

        <div className={styles.playerControllers}>
          <span>00:00</span>
          <div className={styles.slider}>
            <div></div>
          </div>
          <span>03:56</span>
        </div>
      </div>
    </div>
  )
}