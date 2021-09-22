import { InputHTMLAttributes } from 'react'
import { FaEnvelope, FaLock, FaKey, FaUnlock, FaUser } from 'react-icons/fa'

import styles from './styles.module.scss'

const icons = {
  envelope: <FaEnvelope size={20} className={styles.icon}/>,
  key: <FaKey size={20} className={styles.icon}/>,
  lock: <FaLock size={20} className={styles.icon}/>,
  unlock: <FaUnlock size={20} className={styles.icon}/>,
  user: <FaUser size={20} className={styles.icon}/>,
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
  icon: "envelope" | 'key' | 'lock' | 'unlock' | 'user'
  title: string;
  value: string;
  setValue: (value: string) => void;
}

export function Input({ value, title, setValue, icon, ...rest } : InputProps){
  return(
    <div className={`${styles.inputContainer} ${value && styles.inputContainerActive}`}>
      <span>{title}</span>
      <input 
        {...rest}
        onChange={(event)=> setValue(event.target.value)}
      />
      {icons[icon]}
    </div>
  )
}