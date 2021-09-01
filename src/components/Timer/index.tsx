import { useEffect, useState } from "react"

interface TimerProps{
  isClockActive : boolean
}

export function Timer({ isClockActive } : TimerProps){
  const [ timer, setTimer ] = useState<string[]>(["00",":00:","00"])
  const [ seconds, setSeconds ] = useState(0)

  useEffect(()=>{
    if(isClockActive){
      setTimeout(()=> {
        setSeconds(prevState => prevState + 1)
      },1000)
      const timestamp = convertDurationToTimeString(seconds)
      setTimer(timestamp)
    }
  },[seconds, isClockActive])

  function convertDurationToTimeString(duration : number){
    const hours = Math.floor(duration /  3600)
    const minutes = Math.floor((duration % 3600) / 60)
    const seconds = duration % 60
  
    const timeString = [hours, minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
  
    timeString[1] = `:${timeString[1]}:`
  
    return timeString
  }
  return(
    <span>{timer}</span>
  )
}