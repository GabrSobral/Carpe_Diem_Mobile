import { FormEvent, useState } from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'

import { SignPageHeader } from '../../components/SignPageHeader'

import styles from './styles.module.scss'
import { useUsers } from '../../contexts/UserContext';
import { Button } from '../../components/Button';
import { useEffect } from 'react';

export const SignIn: React.FC = () => {
  const history = useHistory()
  const { Sign } = useUsers()
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ isLoading, setIsLoading ] = useState(false)
  const [ message, setMessage ] = useState<string>('')
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => { setIsVisible(true) },[])

  async function signIn(event : FormEvent){
    event.preventDefault()
    setIsLoading(true)

    const result = await Sign({email, password, query: "/login"});
    if(result.message === "ok") {
      if(result.data.user.hasAnswered === true) {
        setIsVisible(false);
        setTimeout(() => history.replace('/Home'), 300);
        return;
      } else{
        setIsVisible(false);
        setTimeout(() => history.replace('/Questionnaire'), 300);
        return;
      }
    } else {
      setMessage(result.message)
      setIsLoading(false)
    }
  }

  return(
    <div className={styles.wrapper}>
      <SignPageHeader 
        title='Entrar' 
        button='Cadastrar'
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
              
              <Link to="/ForgotPassword">
                <button 
                  type="button" 
                  className={styles.forgotPassword}
                >
                    Esqueci minha senha
                </button>
              </Link>
              
              <span className={styles.warningText}>{message}</span>
              
              <Button 
                title="Entrar"
                isLoading={isLoading}
                icon="SignIn"
                disabled={email && password && !isLoading ? false : true} 
                onClick={signIn}
              />
            </form>
          </motion.section>
        ) }
      </AnimatePresence>
    </div>
  )
}