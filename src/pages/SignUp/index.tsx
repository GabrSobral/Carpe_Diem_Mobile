import { motion, AnimatePresence } from "framer-motion"
import { FormEvent, useState } from "react"
import { FaUser, FaEnvelope, FaLock, FaUnlock } from "react-icons/fa"
import { useHistory } from "react-router"

import { SignPageHeader } from '../../components/SignPageHeader'

import styles from '../SignIn/styles.module.scss'
import { useUsers } from "../../contexts/UserContext"
import { Button } from "../../components/Button"
import { useEffect } from "react"

export const SignUp: React.FC = () => {
  const history = useHistory()
  const [ isLoading, setIsLoading ] = useState(false)
  const [ name, setName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ confirmPassword, setConfirmPassword ] = useState<string>('')
  const [ isVisible, setIsVisible ] = useState(false)

  useEffect(() => { setIsVisible(true) },[])

  const { Sign } = useUsers()

  async function SignUp(event: FormEvent){
    event.preventDefault()

    name.trim()
    email.trim()
    
    if(password !== confirmPassword){
      return setMessage("Sua confirmação de senha está inválida!")
    }
    setIsLoading(true)
    
    const result = await Sign({name, email, password, query: "/users"})
    if(result.message === "ok") {
      history.push('/Questionnaire')
    } else {
      setMessage(result.message)
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <SignPageHeader 
        title='Cadastrar' 
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
              
              <div className={`${styles.inputContainer} ${name && styles.inputContainerActive}`}>
                <span>Nome</span>
                <input type='text' onChange={(event)=> setName(event.target.value)}/>
                <FaUser size={20} className={styles.icon}/>
              </div>
            
              <div className={`${styles.inputContainer} ${email && styles.inputContainerActive}`}>
                <span>Email</span>
                <input type='email' onChange={(event)=> setEmail(event.target.value)}/>
                <FaEnvelope size={20} className={styles.icon}/>
              </div>

              <div className={`${styles.inputContainer} ${password && styles.inputContainerActive}`}>
                <span>Senha</span>
                <input type='password' onChange={(event)=> setPassword(event.target.value)}/>
                <FaLock size={20} className={styles.icon}/>
              </div>

              <div className={`${styles.inputContainer} ${confirmPassword && styles.inputContainerActive}`}>
                <span>Confirmar senha</span>
                <input type='password' onChange={(event)=> setConfirmPassword(event.target.value)}/>
                <FaUnlock size={20} className={styles.icon}/>
              </div>

              <span className={styles.warningText}>{message}</span>

              <Button
                title="Cadastrar"
                icon="SignIn"
                isLoading={isLoading}
                onClick={SignUp} 
                disabled={name && email && password && confirmPassword && !isLoading ? false : true}
              />
            </form>
          </motion.section>
        ) }
      </AnimatePresence>
    </div>
  )
}