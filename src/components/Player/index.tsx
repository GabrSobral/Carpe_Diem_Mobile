import { useEffect, useRef, useState } from 'react'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

import playSVG from '../../images/play.svg'
import pauseSVG from '../../images/pause.svg'
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'
import styles from './style.module.scss'

interface PlayerProps{
  name: string;
  duration: number;
  url: string 
}

export function Player({ name,  duration, url }: PlayerProps){
  const [ isPlaying, setIsPlaying ] = useState<boolean>(false)
  const [ progress, setProgress ] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(()=> {
    if(!audioRef.current){
      return
    }
    if(isPlaying){
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }

  },[isPlaying])

  function setupProgressListener(){
    if(!audioRef.current){
      return
    }
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      if(!audioRef.current){
        return
      }
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount : number){
    if(!audioRef.current){
      return
    }
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  return(
    <div className={styles.playerContainer}>
      <audio
        src={url}
        autoPlay
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={setupProgressListener}
      />
      <div className={styles.player}>
        <button type="button" onClick={() => setIsPlaying(!isPlaying)}>
        {
          isPlaying 
          ? <img src={pauseSVG} alt="Tocar"/>
          : <img src={playSVG} alt="Pause"/>
        }
        </button>

        <div className={styles.playerControllers}>
          <span>{convertDurationToTimeString(progress)}</span>
          <Slider
              max={duration}
              value={progress}
              onChange={handleSeek}
              trackStyle={{ backgroundColor :  '#04d361'}}
              railStyle={{ backgroundColor : '#9f75ff' }}
              handleStyle={{ borderColor : '#04d361', borderWidth : 4 }}
            />
          <span>{convertDurationToTimeString(Math.round(duration))}</span>
        </div>
      </div>
      <span className={styles.audio_name}>{name}</span>
    </div>
  )
}