import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useHistory } from "react-router"
import { FormEvent } from "react-router/node_modules/@types/react"
import { Header } from "../../components/header"
import { LoadingStatus } from "../../components/LoadingStatus"
import { useLoading } from "../../contexts/LoadingContext"
import { api } from "../../services/api"

import styles from './styles.module.scss'

interface QuestionProps {
  id: string;
  body: String;
  category: {
    id: String;
    name: String;
  }
}

export const Questionnaire: React.FC = () => {
  const history = useHistory()
  const [ isVisible, setIsVisible ] = useState(false)
  const { isLoading, setLoadingTrue, closeLoading } = useLoading()
  const [ questions, setQuestions ] = useState<QuestionProps[]>([])

  const [ isFilled, setIsFilled ] = useState(false)
  const [ allAnswers, setAllAnswers ] = useState<any[]>([])
  const [ count, setCount ] = useState(0)

  useEffect(()=>{ console.log(allAnswers) }, [allAnswers])
  useEffect(() => {
    (async () => {
      const { data } = await api.get('/question/list')
      setQuestions(data)
      setIsVisible(true)
      const nullArray = data.map(()=> null)
      console.log('nullArray: ', nullArray)
      setAllAnswers(nullArray)
    })()
  }, [])

  useEffect(() => {
    if(allAnswers.indexOf(null) === -1) {
      setIsFilled(true)
      console.log("Cheiooooo: ", allAnswers)
    }
  },[count]) 

  async function handleConfirm(){
    setLoadingTrue()
    console.log('allAnswers: ', allAnswers)
    await api.post('/questionnaire', { answers : allAnswers }).then(()=> {
      // history.push("/Home")
      return 
    }).catch((err)=>{
      console.log(err.response.data.message)
      // history.push("/Home")
      return 
    })
  }
  function handleAnswersAndIndex(value: any, index: number){
    console.log(value.target.value)
    setAllAnswers(prevState => {
      prevState.splice(index, 1, value.target.value)
      return prevState
    })
  }

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={false}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {isLoading && <LoadingStatus/> }
            <h2>Permita-nos conhecê-lo(a) <br/> melhor</h2>

            {questions.map((question, index) => (
              <div className={styles.questionItem} key={question.id}>
                <span>{question.body}</span>

                <div 
                  className={styles.answersContainer} 
                  onChange={(event: FormEvent<HTMLInputElement>) =>
                     { handleAnswersAndIndex(event, index) }}
                >
                  <div>
                    <input type="radio" id="answer-0" name={question.id} value="0"/>
                    <label htmlFor="answer-0">0</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-1" name={question.id} value="1"/>
                    <label htmlFor="answer-1">1</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-2" name={question.id} value="2"/>
                    <label htmlFor="answer-2">2</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-3" name={question.id} value="3"/>
                    <label htmlFor="answer-3">3</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-4" name={question.id} value="4"/>
                    <label htmlFor="answer-4">4</label>
                  </div>
                  <div>
                    <input type="radio" id="answer-5" name={question.id} value="5"/>
                    <label htmlFor="answer-5">5</label>
                  </div>
                </div>
              </div>
            ))}

              <button 
                type="button" 
                onClick={handleConfirm}
                disabled={!isFilled}
              >
                Continuar
              </button>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}