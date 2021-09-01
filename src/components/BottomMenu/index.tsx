import styles from './styles.module.scss'
import { FiList, FiHome, FiUser} from 'react-icons/fi'
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
          history.push("/Activity/Activities")
          setLoadingTrue();
        } break;
      }
      case "home" : {
        if(pageActive !== "home"){
          history.push("/Home/Home")
          setLoadingTrue();
        } break;
      }
      case "me" : {
        if(pageActive !== "me"){
          history.push("/Me/Me")
          setLoadingTrue();
        } break;
      }
    }
  }

  return(
    <footer className={styles.container}>
        <button type='button' className={pageActive === "activities" ? styles.active : ''} onClick={()=> navigate("activities")}>
          <FiList size={30} color={'#fff'}/>
          Atividades
        </button>

        <button type='button' className={pageActive === "home" ? styles.active : ''} onClick={()=> navigate("home")}>
          <FiHome size={30} color={'#fff'}/>
          home
        </button>

        <button type='button' className={pageActive === "me" ? styles.active : ''} onClick={()=> navigate("me")}>
          <FiUser size={30} color={'#fff'}/>
          Eu
        </button>
    </footer>
  )
}