import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState, FormEvent } from "react"
import { useHistory } from "react-router"
import { Button } from "../../components/Button"

import { Header } from "../../components/header"
import { useUsers } from "../../contexts/UserContext"
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
  const [ isLoading, setIsLoading ]= useState(false)
  const [ questions, setQuestions ] = useState<QuestionProps[]>([])
  const [ message, setMessage ] = useState('')
  const [ isFilled, setIsFilled ] = useState(false)
  const [ allAnswers, setAllAnswers ] = useState<any[]>([])
  const [ count, setCount ] = useState(0)
  const { setHasAnswered, user } = useUsers()

  useEffect(() => {
    (async () => {
      const questionsData = await api.get('/question/list')
      setQuestions(questionsData.data)
      let visible = false
      setIsVisible(() => {
        visible = true
        return true
      })

        if(user?.hasAnswered && visible) {
          const { data } = await api.get('/answer/my-list')
          const allAnswers: string[] = []
          data.forEach((item: any, index: number) => {
            const inputElement: any = document.getElementById(`${item.question}-${item.answer}`)
            inputElement && (inputElement.checked = true)
            allAnswers.push(item.answer)
          })
          setAllAnswers(allAnswers)
        } else {
          const nullArray = questionsData.data.map(()=> null)
          setAllAnswers(nullArray)
        }
    })()
  }, [user?.hasAnswered])


  useEffect(() => {
    if(allAnswers.indexOf(null) === -1 && allAnswers.length !== 0) {
      setIsFilled(true)
    }
  },[count, allAnswers]) 

  async function handleConfirm(){
    setIsLoading(true)

    await api.post('/answer/new', { answer : allAnswers }).then(()=> {
      setHasAnswered()
      history.push("/Home")
      return 
    }).catch((err)=>{
      setMessage(`Algo deu errado: ${err.response.data.message}`)
      setIsLoading(false)
      return 
    })
  }

  function handleAnswersAndIndex(value: any, index: number){
    allAnswers.splice(index, 1, value.target.value)
    setAllAnswers(allAnswers)
    setCount(prev => prev + 1)
  }

  return(
    <div className={styles.container}>
      <Header GoBackIsActive={!!user?.hasAnswered}/>
      <AnimatePresence exitBeforeEnter>
        {isVisible && (
          <motion.main
            key="Activities"
            initial={{ opacity: 0, height: 0, y: 50 }}
            animate={{ opacity: 1, height: "fit-content", y: 0}}
            exit={{ opacity: 0}}
          >
            {user?.hasAnswered ?
              <h2>Revise e selecione suas <br/> respostas novamente</h2> : 
              <h2>Permita-nos conhecê-lo(a) <br/> melhor</h2> 
            }

            {questions.map((question, index) => (
              <div className={styles.questionItem} key={question.id}>
                <span>{question.body}</span>

                <div 
                  className={styles.answersContainer} 
                  onChange={(event: FormEvent<HTMLInputElement>) =>
                     { handleAnswersAndIndex(event, index) }}
                >
                  <div>
                    <input type="radio" id={`${question.id}-0`} name={question.id} value="0"/>
                    <label htmlFor={`${question.id}-0`}>0</label>
                  </div>
                  <div>
                    <input type="radio" id={`${question.id}-1`} name={question.id} value="1"/>
                    <label htmlFor={`${question.id}-1`}>1</label>
                  </div>
                  <div>
                    <input type="radio" id={`${question.id}-2`} name={question.id} value="2"/>
                    <label htmlFor={`${question.id}-2`}>2</label>
                  </div>
                  <div>
                    <input type="radio" id={`${question.id}-3`} name={question.id} value="3"/>
                    <label htmlFor={`${question.id}-3`}>3</label>
                  </div>
                  <div>
                    <input type="radio" id={`${question.id}-4`} name={question.id} value="4"/>
                    <label htmlFor={`${question.id}-4`}>4</label>
                  </div>
                  <div>
                    <input type="radio" id={`${question.id}-5`} name={question.id} value="5"/>
                    <label htmlFor={`${question.id}-5`}>5</label>
                  </div>
                </div>
              </div>
            ))}

            <span className={styles.warningText}>{message}</span>

            <Button
              icon="none"
              isLoading={isLoading}
              onClick={handleConfirm}
              disabled={!isFilled}
              title="Continuar"
            />
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}