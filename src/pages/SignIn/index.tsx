import { FormEvent, useEffect, useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'

import { SignPageHeader } from '../../components/SignPageHeader'
import { LoadingStatus } from '../../components/LoadingStatus'
import { useLoading } from '../../contexts/LoadingContext';

import styles from './styles.module.scss'

export const SignIn: React.FC = () => {
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const { setLoadingTrue, isLoading, closeLoading } = useLoading()
  const [ isFilled, setIsFilled ] = useState(true)
  const [ message, setMessage ] = useState<string>('')

  // useEffect(()=> {
  //   return closeLoading()
  // },[closeLoading])

  useEffect(()=>{
    email && password ? setIsFilled(false) : setIsFilled(true)
  },[email, password])


  async function signIn(event : FormEvent){
    event.preventDefault()
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
          
          <span>{message}</span>
          
          <button type='submit' disabled={isFilled} onClick={signIn}>
            Entrar
            <FaSignInAlt size={24} />
          </button>
        </form>
      </motion.section>
    </div>
  )
}