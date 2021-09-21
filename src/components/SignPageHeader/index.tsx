import { useHistory } from 'react-router-dom'

import styles from './style.module.scss'

interface headerProps{
  title : string,
  button?: "Entrar" | "Cadastrar",
  setIsVisibleToFalse: () => void;
}

export function SignPageHeader({ title, button, setIsVisibleToFalse } : headerProps){
  const history = useHistory()

  return(
    <header className={styles.container}>
      <h1>{title}</h1>

      {button && 
        <button 
          type="button"
          onClick={() => {
            setIsVisibleToFalse()
            setTimeout(() => history.replace(
              button === 'Entrar' ? '/SignIn' : '/SignUp'), 300)
          }}  
        >
          {button}
        </button>
      }
    </header>
  )
}