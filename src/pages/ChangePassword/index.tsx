import { useMemo, useState } from "react";
import { useHistory } from 'react-router-dom'
import { FaLock, FaUnlock, FaSave, FaKey } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';

import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from './styles.module.scss'
import { Header } from "../../components/header";
import { useCallback } from "react";

export function ChangePassword() {
  const [ currentPassword, setCurrentPassword ] = useState<string>('')
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)

  const history = useHistory()
  // const { email, token } = history.location

  const changePassword = useCallback(async () => {
    if(newPassword !== confirmNewPassword){
      setMessage("Senhas não estão iguais!")
      return
    }
    try{
      await api.post('/users/change-password', { 
        oldPassword: currentPassword,
        newPassword
      })
      history.push('/Profile')
    } catch(error: any){
      setMessage(error.response.data.error)
    }
  },[newPassword, confirmNewPassword, currentPassword, history])

  const memoizedModal = useMemo(()=>(
    <AnimatePresence exitBeforeEnter>
      {isModalVisible && (
        <Modal
          title="Tudo resolvido..."
          description="Sua senha foi alterada com sucesso, faça login para entrar"
          keyModal="ResetPassword"
          setIsVisible={setIsModalVisible}
          yesAndNoButtons={false}
          destinyPage="Me/Me"
        />
      )}
    </AnimatePresence>
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <Header GoBackIsActive={true}/>
  ),[])

  const memoizedCurrentPassword = useMemo(()=> (
    <div className={!currentPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Senha atual</span>
      <input type='password' onChange={(event)=> setCurrentPassword(event.target.value)}/>
      <FaKey size={20} className={styles.icon}/>
    </div>
  ),[currentPassword])

  const memoizedNewPassword = useMemo(()=> (
    <div className={!newPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Nova senha</span>
      <input type='password' onChange={(event)=> setNewPassword(event.target.value)}/>
      <FaLock size={20} className={styles.icon}/>
    </div>
  ),[newPassword])

  const memoizedConfirmNewPassword = useMemo(()=> (
    <div className={!confirmNewPassword ? styles.inputContainer : styles.inputContainerActive}>
      <span>Confirme nova senha</span>
      <input type='password' onChange={(event)=> setConfirmNewPassword(event.target.value)}/>
      <FaUnlock size={20} className={styles.icon}/>
    </div>
  ),[confirmNewPassword])

  const memoizedMessage = useMemo(()=> (
    <span className={styles.warningText}>{message}</span>
  ),[message])
  
  const memoizedButton = useMemo(()=> (
    <button 
      type='button' 
      onClick={changePassword} 
      disabled={newPassword && confirmNewPassword ? false : true}
    >
      Confirmar
      <FaSave size={24}/>
    </button>
  ),[ newPassword, confirmNewPassword, changePassword ])

  return (
    <div className={styles.wrapper}>
      {memoizedHeader}
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <span className={styles.changePasswordTitle}>Alterar senha</span>

        <form className={styles.formContainer}>
          {memoizedModal}

          {memoizedCurrentPassword}
          {memoizedNewPassword}
          {memoizedConfirmNewPassword}

          {memoizedMessage}
          {memoizedButton}
        </form>
      </motion.section>
    </div>
  )
}