import { motion } from "framer-motion"
import { FormEvent, useEffect, useState } from "react"
import { FaUser, FaEnvelope, FaSignInAlt, FaLock, FaUnlock } from "react-icons/fa"
import { useHistory } from "react-router"

import { SignPageHeader } from '../../components/SignPageHeader'
import { LoadingStatus } from '../../components/LoadingStatus'
import { useLoading } from "../../contexts/LoadingContext"

import styles from '../SignIn/styles.module.scss'
import { useUsers } from "../../contexts/UserContext"

export const SignUp: React.FC = () => {
  const history = useHistory()
  const [ name, setName ] = useState<string>('')
  const [ email, setEmail ] = useState<string>('')
  const [ password, setPassword ] = useState<string>('')
  const [ message, setMessage ] = useState<string>('')
  const [ confirmPassword, setConfirmPassword ] = useState<string>('')

  const { Sign } = useUsers()
  const { setLoadingTrue, isLoading, closeLoading } = useLoading()

  useEffect(()=> { closeLoading() },[closeLoading])

  async function SignUp(event: FormEvent){
    event.preventDefault()

    name.trim()
    email.trim()
    
    if(password !== confirmPassword){
      return setMessage("Sua confirmação de senha está inválida!")
    }
    setLoadingTrue()
    
    const result = await Sign({name, email, password, query: "/users"})
    if(result.message === "ok") {
      history.push('/')
    } else {
      setMessage(result.message)
    }
    closeLoading()
  }

  return (
    <div className={styles.wrapper}>
      <SignPageHeader title='Cadastrar' button='Entrar'/>
      <motion.section
        initial={{opacity : 0, y : 50}}
        animate={{opacity : 1, y : 0}}
      >
        <form className={styles.formContainer}>
          {isLoading && ( <LoadingStatus/>)}
          
          <div className={!name ? styles.inputContainer : styles.inputContainerActive}>
            <span>Nome</span>
            <input type='text' onChange={(event)=> setName(event.target.value)}/>
            <FaUser size={20} className={styles.icon}/>
          </div>
         
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

          <div className={!confirmPassword ? styles.inputContainer : styles.inputContainerActive}>
            <span>Confirmar senha</span>
            <input type='password' onChange={(event)=> setConfirmPassword(event.target.value)}/>
            <FaUnlock size={20} className={styles.icon}/>
          </div>

          <span className={styles.warningText}>{message}</span>

          <button 
            type='button' 
            onClick={SignUp} 
            disabled={name && email && password && confirmPassword ? false : true}
          >
            Cadastrar
            <FaSignInAlt size={24}/>
          </button>
        </form>
      </motion.section>
    </div>
  )
}