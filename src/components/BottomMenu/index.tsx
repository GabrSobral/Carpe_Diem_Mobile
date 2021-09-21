import { useState } from 'react'
import ReactDOM from 'react-dom';
import { AnimatePresence } from 'framer-motion'
import { useHistory } from 'react-router-dom'
import { FiList, FiUser} from 'react-icons/fi'

import UrgentSVG from '../../images/urgent.svg'
import styles from './styles.module.scss'
import { UrgentModal } from '../UrgentModal'

interface TabsProps{
  pageActive : string
}

export function BottomMenu({ pageActive }: TabsProps){
  const [ isUrgentModalVisible, setIsUrgentModalVisible ] = useState(false)

  const history = useHistory()

  function navigate(page: string){
    switch(page){
      case "activities" : {
        if(pageActive !== "activities"){
          history.push("/Activities")
        } break;
      }
      case "home" : {
        if(pageActive !== "home"){
          history.push("/Home")
        } break;
      }
      case "me" : {
        if(pageActive !== "me"){
          history.push("/Profile")
        } break;
      }
    }
  }

  return(
    <footer className={styles.container}>
      {ReactDOM.createPortal(
        <AnimatePresence exitBeforeEnter>
          {isUrgentModalVisible && 
          <UrgentModal setIsVisible={setIsUrgentModalVisible}/>}
        </AnimatePresence>,
        document.body
      ) }

      
      <button 
        type='button' 
        className={pageActive === "activities" ? styles.active : ''} 
        onClick={()=> navigate("activities")}
      >
        <FiList className={styles.iconButton}/>
      </button>

      <button  
        type='button' 
        className={styles.urgentButton} 
        onClick={()=> setIsUrgentModalVisible(!isUrgentModalVisible)}
      >
        <img src={UrgentSVG} alt="Clique em caso de crise" />
      </button>

      <button 
        type='button' 
        className={pageActive === "me" ? styles.active : ''} 
        onClick={()=> navigate("me")}
      >
        <FiUser className={styles.iconButton}/>
      </button>
    </footer>
  )
}