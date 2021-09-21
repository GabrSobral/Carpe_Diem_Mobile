import { useCallback, useMemo, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom'
import { FaLock, FaUnlock, FaSave } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion';

import { SignPageHeader } from "../../components/SignPageHeader";
import { Modal } from '../../components/Modal'
import { api } from '../../services/api'

import styles from '../ChangePassword/styles.module.scss'
import { useEffect } from "react";

export function ResetPassword() {
  const history = useHistory()
  const location = useLocation()
  const [ newPassword, setNewPassword ] = useState<string>('')
  const [ confirmNewPassword, setConfirmNewPassword ] = useState<string>('')

  const [ message, setMessage ] = useState<string>('')
  const [ isModalVisible, setIsModalVisible ] = useState<boolean>(false)
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => { setIsVisible(true) },[])

  const reset = useCallback(async () => {
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
        destinyPage="Login/SignIn"
        />)
      }
    </AnimatePresence>
   
  ),[isModalVisible])

  const memoizedHeader = useMemo(()=> (
    <SignPageHeader 
      title='Troca de senha' 
      setIsVisibleToFalse={() => setIsVisible(false)}
    />
  ),[])

  const memoizedTitle = useMemo(()=> (
    <span className={styles.title}>Insira sua nova senha</span>
  ),[])

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
    <button type='button' onClick={reset} disabled={newPassword && confirmNewPassword ? false : true}>
      Confirmar
      <FaSave size={24}/>
    </button>
  ),[ newPassword, confirmNewPassword, reset ])

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

            {memoizedTitle}
            {memoizedNewPassword}
            {memoizedConfirmNewPassword}

            {memoizedMessage}
            {memoizedButton}
          </form>
        </motion.section>
      )}
      </AnimatePresence>
    </div>
  )
}