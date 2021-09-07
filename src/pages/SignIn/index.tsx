import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock, FaSignInAlt } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';
import { motion } from 'framer-motion'

import { SignPageHeader } from '../../components/SignPageHeader'
import { useLoading } from '../../contexts/LoadingContext';

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';

export const SignIn: React.FC = () => {
  const history = useHistory()
  const { Sign } = useUsers()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const { setLoadingTrue, isLoading, closeLoading } = useLoading()
  const [ message, setMessage ] = useState<string>('')

  async function signIn(event : FormEvent){
    event.preventDefault()
    setLoadingTrue()
    
    const result = await Sign({email, password, query: "/login"})
    if(result.message === "ok") {
      console.log(result.data.user.hasAnswered)
      if(result.data.user.hasAnswered === true) {
        closeLoading()
        return history.push('/Home')
      } else{
        closeLoading()
        return history.push('/Questionnaire')  
      }
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
            <button 
              type="button" 
              onClick={()=> setLoadingTrue()} 
              className={styles.forgotPassword}
            >
                Esqueci minha senha
            </button>
          </Link>
          
          <span className={styles.warningText}>{message}</span>
          
          <button type='submit' disabled={email && password && !isLoading ? false : true} onClick={signIn}>
            Entrar
            <FaSignInAlt size={24} />
          </button>
        </form>
      </motion.section>
    </div>
  )
}