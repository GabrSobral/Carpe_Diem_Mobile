import { useState } from "react";
import { IonPage } from '@ionic/react'
import { useHistory } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';

import { Modal } from '../../components/Modal'
import { Header } from "../../components/header";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { api } from '../../services/api'
import styles from './styles.module.scss'

export function ChangePassword() {
  const [ currentPassword, setCurrentPassword ] = useState<string>('')
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  const history = useHistory()

  async function changePassword(){
    if(newPassword !== confirmNewPassword){
      setMessage("Senhas não estão iguais!")
      return
    }
    setIsLoading(true)
    try{
      await api.post('/users/change-password', { 
        oldPassword: currentPassword,
        newPassword
      })
      history.goBack();
    } catch(error: any){
      setMessage(error.response.data.error)
      setIsLoading(false)
    }
  }

  return (
    <IonPage>
      <div className={styles.wrapper}>
        <Header GoBackIsActive={true}/>

        <section>
          <span className={styles.changePasswordTitle}>Alterar senha</span>

          <form className={styles.formContainer} onSubmit={changePassword}>
            <AnimatePresence exitBeforeEnter>
              {isModalVisible && (
                <Modal
                  title="Tudo resolvido..."
                  description="Sua senha foi alterada com sucesso, faça login para entrar"
                  keyModal="ResetPassword"
                  setIsVisible={setIsModalVisible}
                  yesAndNoButtons={false}
                />
              )}
            </AnimatePresence>

            <Input
              icon="key"
              type="password"
              autoComplete="none"
              title="Senha atual"
              setValue={(value: string) => setCurrentPassword(value)}
              value={currentPassword}
            />

            <Input
              icon="lock"
              type="password"
              autoComplete="none"
              title="Nova senha"
              setValue={(value: string) => setNewPassword(value)}
              value={newPassword}
            />

            <Input
              icon="lock"
              type="password"
              title="Confirme nova senha"
              setValue={(value: string) => setConfirmNewPassword(value)}
              value={confirmNewPassword}
            />

            <span className={styles.warningText}>{message}</span>

            <Button
              isLoading={isLoading}
              icon="Save"
              title="Confirmar"
              disabled={newPassword && confirmNewPassword ? false : true}
            />
          </form>
        </section>
      </div>
    </IonPage>
  )
}