import { useEffect, useMemo, useState } from "react";
import { FaEnvelope, FaCheck } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from '../ChangePassword/styles.module.scss'
import { useCallback } from "react";

export function ForgotPassword() {
  const [ email, setEmail ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => { setIsVisible(true) },[])

  const sendEmail = useCallback(async () => {
    try{
      await api.post('/users/forgot-password', { email }).then(()=> {
        setIsModalVisible(true)
      })
    } catch(error: any) {
      setMessage(error.response.data.error)
    }
  },[email])

  const memoizedModal = useMemo(()=>(
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
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader 
      title='Senha' 
      button='Entrar'
      setIsVisibleToFalse={() => setIsVisible(false)}
    />
  ),[])

  const memoizedEmail = useMemo(()=> (
    <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
      <span>Email</span>
      <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
      <FaEnvelope size={20} className={styles.icon}/>
    </div>
  ),[ email ]) 
  
  const memoizedButton = useMemo(()=> (
    <button 
      type='button' 
      onClick={sendEmail} 
      disabled={email ? false : true}
    >
      Confirmar
      <FaCheck size={24}/>
    </button>
  ),[ email, sendEmail ])

  return (
    <div className={styles.wrapper}>
      {memoizedHeader}
      <AnimatePresence>
        { isVisible && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0}}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.3, bounce: 0 }}
          >
            <form className={styles.formContainer}>
              {memoizedModal}

              <span className={styles.title}>Insira seu email para <br/> sabermos quem é você.</span>
              {memoizedEmail}

              <span className={styles.warningText}>{message}</span>
              {memoizedButton}
            </form>
          </motion.section>
        ) }
      </AnimatePresence>

    </div>
  )
}
