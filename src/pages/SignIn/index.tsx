import { FormEvent, useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'

import { SignPageHeader } from '../../components/SignPageHeader'
import { LoadingStatus } from '../../components/LoadingStatus'
import { useLoading } from '../../contexts/LoadingContext';

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';

export const SignIn: React.FC = () => {
  const { Sign } = useUsers()
  const history = useHistory()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const { setLoadingTrue, isLoading, closeLoading } = useLoading()
  const [ message, setMessage ] = useState<string>('')

  useEffect(()=> { closeLoading() },[closeLoading])
  useEffect(()=> { console.log(message) },[message])

  async function signIn(event : FormEvent){
    event.preventDefault()
    
    const result = await Sign({email, password, query: "/login"})
    console.log(result)
    if(result.message === "ok") {
      history.push('/')
    } else {
      setMessage(result.message)
      closeLoading()
    }
  }

  return(
    <div className={styles.wrapper}>
      <SignPageHeader title='Entrar' button='Cadastrar'/>
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {isLoading && (<LoadingStatus/>) }
          <div className={!email ? styles.inputContainer : styles.inputContainerActive}>
            <span>Email</span>
            <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
            <FaEnvelope size={20} className={styles.icon}/>
          </div>

          <div className={!password ? styles.inputContainer : styles.inputContainerActive}>
            <span>Senha</span>
            <input type='password' onChange={(event)=> setPassword(event.target.value)}/>
            <FaLock size={20} className={styles.icon}/>
          </div>
          
          <Link to="/Login/ForgotPassword">
            <button onClick={()=> setLoadingTrue()} className={styles.forgotPassword}>Esqueci minha senha</button>
          </Link>
          
          <span className={styles.warningText}>{message}</span>
          
          <button type='submit' disabled={email && password ? false : true} onClick={signIn}>
            Entrar
            <FaSignInAlt size={24} />
          </button>
        </form>
      </motion.section>
    </div>
  )
}