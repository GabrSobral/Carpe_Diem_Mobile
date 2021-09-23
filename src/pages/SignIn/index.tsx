import { FormEvent, useState } from 'react';
import { IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom';

import { SignPageHeader } from '../../components/SignPageHeader'
import { Input } from '../../components/Input'

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';
import { Button } from '../../components/Button';

export const SignIn: React.FC = () => {
  const history = useHistory()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ message, setMessage ] = useState<string>('')
  const { Sign } = useUsers()

  async function signIn(event : FormEvent){
    event.preventDefault()
    setIsLoading(true)

    Sign({email, password, query: "/login"})
    .then((result: any) => {
      if(result.data.user.hasAnswered === true) {
        history.replace('/tabs/Home');
      } else{
        history.replace('/Questionnaire');
      }
    })
    .catch((result: any) => {
      setMessage(result.message)
      setIsLoading(false)
    })
  }

  return(
    <IonPage>
      <div className={styles.wrapper}>
        <SignPageHeader 
          title='Entrar' 
          button='Cadastrar'
        />
        <section>
          <form className={styles.formContainer} onSubmit={signIn}>
            <Input
              type="email"
              icon="envelope"
              value={email}
              setValue={(value: string) => setEmail(value)}
              title="Email"
            />
            <Input
              type="password"
              icon="lock"
              autoComplete="current-password"
              value={password}
              setValue={(value: string) => setPassword(value)}
              title="Senha"
            /> 

            <button 
              type="button" 
              className={styles.forgotPassword}
              onClick={() => {history.push('/ForgotPassword')}}
            >
              Esqueci minha senha
            </button>
            
            <span className={styles.warningText}>{message}</span>
            
            <Button 
              title="Entrar"
              isLoading={isLoading}
              icon="SignIn"
              disabled={email && password && !isLoading ? false : true} 
              onClick={signIn}
            />
          </form>
        </section>
      </div>
    </IonPage>
  )
}