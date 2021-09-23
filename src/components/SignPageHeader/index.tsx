import { useHistory } from 'react-router-dom'

import styles from './style.module.scss'

interface headerProps{
  title : string,
  button?: "Entrar" | "Cadastrar",
}

export function SignPageHeader({ title, button } : headerProps){
  const history = useHistory()

  return(
    <header className={styles.container}>
      <h1>{title}</h1>

      {button && 
        <button 
          type="button"
          onClick={() => {
            history.replace(
              button === 'Entrar' ? '/SignIn' : '/SignUp')
          }}  
        >
          {button}
        </button>
      }
    </header>
  )
}