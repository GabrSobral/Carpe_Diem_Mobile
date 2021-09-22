import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { Modal } from '../../components/Modal'
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

import { api } from '../../services/api'
import styles from '../ChangePassword/styles.module.scss'

export function ForgotPassword() {
  const [ email, setEmail ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => { setIsVisible(true) },[])

  const sendEmail = useCallback(async (event: any) => {
    event.preventDefault()
    try{
      setIsLoading(true)
      await api.post('/users/forgot-password', { email }).then(()=> {
        setIsModalVisible(true)
        setIsLoading(false)
      })
    } catch(error: any) {
      setIsLoading(false)
      setMessage(error.response.data.error)
    }
  },[email])

  return (
    <div className={styles.wrapper}>
      <SignPageHeader 
        title='Senha' 
        button='Entrar'
        setIsVisibleToFalse={() => setIsVisible(false)}
      />

      <AnimatePresence>
        { isVisible && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, bounce: 0 }}
          >
            <form className={styles.formContainer}>
              <AnimatePresence exitBeforeEnter>
                {isModalVisible && (
                  <Modal
                    title="Enviado..."
                    description="Verifique a sua caixa de email principal ou spam."
                    keyModal="EmailSend"
                    setIsVisible={setIsModalVisible}
                    yesAndNoButtons={false}
                    destinyPage="SignIn"
                  />
                )}
              </AnimatePresence>

              <span className={styles.title}>Insira seu email para <br/> sabermos quem é você.</span>
              
              <Input
                type="emil"
                icon="envelope"
                setValue={(value: string) => setEmail(value)}
                value={email}
                title="Email"
              />

              <span className={styles.warningText}>{message}</span>
              <Button 
                title="Confirmar"
                isLoading={isLoading}
                icon="Check"
                disabled={email ? false : true} 
                onClick={sendEmail}
              />
            </form>
          </motion.section>
        ) }
      </AnimatePresence>

    </div>
  )
}
