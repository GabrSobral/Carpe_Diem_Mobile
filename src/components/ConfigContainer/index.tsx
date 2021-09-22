import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { FiSettings, FiBook, FiLock, FiBookOpen } from 'react-icons/fi'
import { useHistory } from 'react-router'
import styles from './styles.module.scss'

interface ConfigContainerProps {
  setIsVisibleToFalse: () => void;
  setQuantityModalToVisible: () => void;
}

export function ConfigContainer({
   setIsVisibleToFalse, setQuantityModalToVisible }: ConfigContainerProps){
  const [ isSettingVisible, setIsSettingtVisible ] = useState(false)
  const history = useHistory()

  return(
    <div className={styles.configurationsContainer}>
      <button 
        type="button" 
        className={styles.configurationButton} 
        onClick={()=> setIsSettingtVisible(!isSettingVisible)}
      >
        Configurações
        <FiSettings size={27} color="#534A4A"/>
      </button>

      <AnimatePresence>
      {isSettingVisible && (
        <motion.div 
          key="SettingsButton"
          className={styles.hiddenButtons}
          initial={{ height: 0 }}
          animate={{ height: "fit-content"}}
          exit={{ height: 0 }}
          transition={{ duration: 0.3, bounce: 0 }}
        >
          <button 
            type="button"
            onClick={() => {
              setIsVisibleToFalse()
              setTimeout(() => history.push('/Questionnaire'),300)
            }}
          >
            Alterar questionário
            <FiBook size={20} color="#6f6b6b"/>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setIsVisibleToFalse()
              setTimeout(() => history.push('/ChangePassword'),300)
            }}
          >
            Alterar senha
            <FiLock size={20} color="#6f6b6b"/>
          </button>

          <button type="button" onClick={setQuantityModalToVisible}>
            Quantidade de atividades diárias
            <FiBookOpen size={20} color="#6f6b6b"/>
          </button>

        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}