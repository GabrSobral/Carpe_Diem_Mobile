import { AnimatePresence, motion } from 'framer-motion'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'

import Success from '../../images/trophy.svg'
import Exclude from '../../images/delete.svg'

import styles from './style.module.scss'

interface ModalProps{
  keyModal: string;
  title: string;
  description: string;
  yesAndNoButtons: boolean;
  setIsVisible: any;
  confirmFunction?: () => any;
  image?: 'Success' | "Exclude"
}

const images = {
  Success : <img src={Success} alt="Imagem de sucesso" />,
  Exclude : <img src={Exclude} alt="Imagem de remover" />
}

export function Modal({ 
  keyModal,
  title,
  description,
  image,
  setIsVisible,
  yesAndNoButtons,
  confirmFunction
 }: ModalProps) {
  const history = useHistory()

  return(
    <>
    {ReactDOM.createPortal(
    <motion.div className={styles.modalBackground}
      layout
      key={`modal${keyModal}Background`}
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 0}}
    >
      <AnimatePresence key={`AP${keyModal}`}>
        <motion.div className={styles.modalContainer}
          key={`modal${keyModal}`}
          animate={{
            scale : [0, 1],
            opacity:[0, 1]}}
          exit={{ scale : 0}}
          transition={{ 
            delay: 0.25,
            bounce: 0.5, 
            type: "spring", 
            duration: 0.3 }}
        >
          {image && images[image]}
          <div>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>

          { yesAndNoButtons ? (
            <div className={styles.removeModalButton}>
              <button 
                type="button" 
                onClick={() => setIsVisible(false)}
                className={styles.yesAndNoButton}
              >
                Não
              </button>

              <button 
                type="button" 
                onClick={confirmFunction}
                className={styles.yesAndNoButton}
              >   
                Sim
              </button>
            </div>
          ) : (
            <button 
              type="button"
              className={styles.finishButton}
              onClick={() => {
                setIsVisible(false)
                setTimeout(() => history.goBack(), 250)
              }}
            >
              Fechar
            </button>
          ) }
        </motion.div>
      </AnimatePresence>
    </motion.div>,
    document.body
    )}
    </>
  )
}