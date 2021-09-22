import { motion, AnimatePresence } from "framer-motion"
import { FormEvent, useState } from "react"
import { useHistory } from "react-router"

import { SignPageHeader } from '../../components/SignPageHeader'

import styles from '../SignIn/styles.module.scss'
import { useUsers } from "../../contexts/UserContext"
import { Button } from "../../components/Button"
import { useEffect } from "react"
import { Input } from "../../components/Input"

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
              
              <Input
                type="text"
                icon="user"
                autoComplete="usename"
                value={name}
                setValue={(value: string) => setName(value)}
                title="Nome"
              />
            
              <Input
                type="email"
                autoComplete="email"
                icon="envelope"
                value={email}
                setValue={(value: string) => setEmail(value)}
                title="Email"
              />

              <Input
                type="password"
                icon="lock"
                autoComplete="current-password"
                value={password}
                setValue={(value: string) => setPassword(value)}
                title="Senha"
              />

              <Input
                type="password"
                icon="unlock"
                autoComplete="current-password"
                value={confirmPassword}
                setValue={(value: string) => setConfirmPassword(value)}
                title="Confirmar senha"
              />

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