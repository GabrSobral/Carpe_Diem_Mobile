import { useCallback, useMemo, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom'
import { IonPage } from '@ionic/react'
import { AnimatePresence } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { Modal } from '../../components/Modal'
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

import { api } from '../../services/api'
import styles from '../ChangePassword/styles.module.scss'

export function ResetPassword() {
  const history = useHistory()
  const location = useLocation()
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ isLoading, setIsLoading ] = useState(false)

  const reset = useCallback(async () => {
    setIsLoading(true)
    const query = new URLSearchParams(location.search)

    if(newPassword !== confirmNewPassword) {
      setMessage("Senhas não estão iguais!")
      return
    }
    try {
      await api.post('/users/reset-password', { 
        email: query.get('email'),
        token: query.get('token'),
        newPassword
      })
      history.push('/SignIn')
    } catch(error: any) {
      setIsLoading(false)
      setMessage(error.response.data.error)
    }

  },[newPassword, confirmNewPassword, history, location])
  
  const memoizedModal = useMemo(()=>(
    <AnimatePresence exitBeforeEnter>
      {isModalVisible && ( 
        <Modal
          title="Tudo resolvido..."
          description="Sua senha foi alterada com sucesso, faça login para entrar"
          keyModal="ResetPassword"
          setIsVisible={setIsModalVisible}
          yesAndNoButtons={false}
        />)
      }
    </AnimatePresence>
  ),[isModalVisible])

  return (
    <IonPage>
      <div className={styles.wrapper}>
        <SignPageHeader title='Troca de senha'/>
        <section>
          <form className={styles.formContainer}>
            {memoizedModal}

            <span className={styles.title}>Insira sua nova senha</span>

            <Input
              type="password"
              icon="lock"
              autoComplete="none"
              setValue={(value: string) => setNewPassword(value)}
              value={newPassword}
              title="Nova senha"
            />

            <Input
              type="password"
              icon="unlock"
              autoComplete="none"
              setValue={(value: string) => setConfirmNewPassword(value)}
              value={confirmNewPassword}
              title="Confirme nova senha"
            />

            <span className={styles.warningText}>{message}</span>

            <Button
              disabled={newPassword && confirmNewPassword ? false : true}
              onClick={reset}
              title="Confirmar"
              isLoading={isLoading}
              icon="Save"
            />
          </form>
        </section>
      </div>
    </IonPage>
  )
}