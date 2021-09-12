import { Link } from 'react-router-dom'

import styles from './style.module.scss'

interface headerProps{
  title : string,
  button?: "Entrar" | "Cadastrar",
}

export function SignPageHeader({ title, button } : headerProps){
  return(
    <header className={styles.container}>
      <h1>{title}</h1>

      {button && (
        <Link to={button === 'Entrar' ? '/SignIn' : '/SignUp'}>
         <button type="button">{button}</button>
        </Link>
      )}
    </header>
  )
}