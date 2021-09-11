import { useMemo, useState } from "react";
import { useHistory } from 'react-router-dom'
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
    <SignPageHeader title='Senha' button='Entrar'/>
  ),[])

  const memoizedTitle = useMemo(()=> (
    <span className={styles.title}>Insira seu email para <br/> sabermos quem é você.</span>
  ),[])

  const memoizedEmail = useMemo(()=> (
    <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
      <span>Email</span>
      <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
      <FaEnvelope size={20} className={styles.icon}/>
    </div>
  ),[ email ]) 

  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
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
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {memoizedModal}

          {memoizedTitle}
          {memoizedEmail}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}
