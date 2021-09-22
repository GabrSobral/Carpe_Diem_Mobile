import { ButtonHTMLAttributes } from "react";
import { FaSignInAlt, FaSave, FaCheck } from 'react-icons/fa'
import Loading from 'react-loading'

import styles from './styles.module.scss'

interface ButtonProps extends  ButtonHTMLAttributes<HTMLButtonElement>{
  icon: "SignIn" | 'none' | "Save" | "Check";
  isLoading: boolean;
  title: string
}

const icons = {
  SignIn: <FaSignInAlt size={24} className={styles.icon}/>,
  Save: <FaSave size={24} className={styles.icon}/>,
  none: null,
  Check: <FaCheck size={24} className={styles.icon}/>
}

export function Button({ icon, isLoading, title, ...rest }: ButtonProps){
  return(
    <button className={styles.container} type='submit' {...rest}>
      {!isLoading ? (
        <>
        { title }
        { icons[icon] }
        </>
      ) : (
        <Loading 
          type={"spin"} 
          color={"#ffffff"} 
          height={"2rem"} 
          width={"2rem"}
        />
      )}
      
    </button>
  )
}