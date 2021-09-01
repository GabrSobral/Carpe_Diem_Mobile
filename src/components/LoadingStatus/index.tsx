import { useMotionValue, motion, AnimatePresence } from 'framer-motion'
import styles from './LoadingStatus.module.scss'
import ReactLoading from 'react-loading'

export function LoadingStatus(){
  const y = useMotionValue(0)

  return(
    <AnimatePresence>
      <motion.div
        key="LoadingStatus" 
        className={styles.container}
        initial={{ y: -40, x:-20 }}
        animate={{ y: 40, x: -20 }}
      >
        <ReactLoading type={"spin"} color={"#1C74E9"} height={'70%'} width={'70%'} />
      </motion.div>
    </AnimatePresence>
  )
}