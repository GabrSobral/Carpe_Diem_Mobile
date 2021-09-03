import styles from './styles.module.scss'
import { FiList, FiUser} from 'react-icons/fi'
import UrgentSVG from '../../images/urgent.svg'
import { useLoading } from '../../contexts/LoadingContext'
import { useHistory } from 'react-router-dom'

interface TabsProps{
  pageActive : string
}

export function BottomMenu({ pageActive }: TabsProps){
  const { setLoadingTrue } = useLoading()
  const history = useHistory()

  function navigate(page: string){
    switch(page){
      case "activities" : {
        if(pageActive !== "activities"){
          history.push("/Activities")
          setLoadingTrue();
        } break;
      }
      case "home" : {
        if(pageActive !== "home"){
          history.push("/Home")
          setLoadingTrue();
        } break;
      }
      case "me" : {
        if(pageActive !== "me"){
          history.push("/Profile")
          setLoadingTrue();
        } break;
      }
    }
  }

  return(
    <footer className={styles.container}>
        <button type='button' className={pageActive === "activities" ? styles.active : ''} onClick={()=> navigate("activities")}>
          <FiList size={34} color={'#fff'}/>
          {/* Atividades */}
        </button>

        <button type='button' className={styles.urgentButton} onClick={()=> navigate("home")}>
          <img src={UrgentSVG} alt="Clique em caso de crise" />
          {/* home */}
        </button>

        <button type='button' className={pageActive === "me" ? styles.active : ''} onClick={()=> navigate("me")}>
          <FiUser size={34} color={'#fff'}/>
          {/* Eu */}
        </button>
    </footer>
  )
}