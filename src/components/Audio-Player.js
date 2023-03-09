import { useState, useEffect, useRef } from 'react'
import timeFormat from '../helpers'
import start from '../img/start.png'
import stop from '../img/stop.png'

export default function AudioPlayer({ accompaniment, vocal, duration }) {
  const accompanimentRef = useRef(null)
  const vocalRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [displayTime, setDisplayTime] = useState()
  const accompanimentID = document.getElementById('accompaniment')
  const vocalID = document.getElementById('vocal')
  const audioPlayer = document.querySelector('.audio-player')

  // Get current play time of the accompaniment
  const timeUpdate = (event) => {
    const currentTime = event.target.currentTime
    setDisplayTime(timeFormat(currentTime))
  }

  //click on timeline to skip around
  const onHandleTimelineUpdate = (e) => {
    // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    const timeline = audioPlayer.querySelector('.timeline')
    const rect = timeline.getBoundingClientRect()
    const timelineWidth = rect.width
    console.log(rect)
    const timeToSeek =
      ((e.clientX - rect.left) / parseInt(timelineWidth)) * duration
    console.log(timeToSeek)
    accompanimentID.currentTime = timeToSeek
    vocalID.currentTime = timeToSeek
  }

  const onHandlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const onHandleTime = (sec) => {
    accompanimentID.currentTime += sec
    vocalID.currentTime = accompanimentID.currentTime
  }

  const onHandleVolume = (vol) => {
    if (
      (vol < 0 && accompanimentID.volume > 0) ||
      (vol > 0 && accompanimentID.volume < 1)
    ) {
      accompanimentID.volume = (accompanimentID.volume + vol).toFixed(1)
      console.log(accompanimentID.volume)
      vocalID.volume = accompanimentID.volume
    }
  }

  const onHandleSpeed = (speed) => {
    accompanimentID.playbackRate = speed
    vocalID.playbackRate = speed
  }

  // Toggle guide vocal
  const guideVocal = () => {
    vocalID.currentTime = accompanimentID.currentTime
    setIsChecked(!isChecked)
    // vocalRef.current.paused ? vocalRef.current.play() : vocalRef.current.pause()
  }

  useEffect(() => {
    if (isPlaying) {
      accompanimentRef.current.play()
      if (isChecked) vocalRef.current.play()
    } else {
      accompanimentRef.current.pause()
      vocalRef.current.pause()
    }
  }, [isPlaying, isChecked])

  useEffect(() => {
    isChecked ? vocalRef.current.play() : vocalRef.current.pause()
  }, [isChecked])

  return (
    <>
      {/* Audio Original */}
      <div className='absolute -z10 invisible left-1/2 -translate-x-1/2'>
        <div className='relative'>
          <audio
            controls
            ref={accompanimentRef}
            onTimeUpdate={timeUpdate}
            id='accompaniment'
          >
            <source src={accompaniment} type='audio/x-wav' />
          </audio>
          <div className='absolute top-0 left-0 -z-10'>
            <audio controls ref={vocalRef} id='vocal'>
              <source src={vocal} type='audio/x-wav' />
            </audio>
          </div>
        </div>
      </div>
      {/* Audio Original */}

      {/* Panel */}
      <div className={`flex flex-col items-center`}>
        <p onClick={() => onHandlePlay()}>{isPlaying ? 'Start' : 'Stop'}</p>
        <div>
          {displayTime} / {timeFormat(duration)}
          <button onClick={() => onHandleTime(-5)}>-5</button>
          <button onClick={() => onHandleTime(5)}>+5</button>
        </div>
        <div>
          Volume:
          <button onClick={() => onHandleVolume(-0.2)}>-</button>
          <button onClick={() => onHandleVolume(0.2)}>+</button>
        </div>
        <div>
          Speed:
          <button onClick={() => onHandleSpeed(0.5)}>0.5</button>
          <button onClick={() => onHandleSpeed(0.75)}>0.75</button>
          <button onClick={() => onHandleSpeed(1)}>1</button>
          <button onClick={() => onHandleSpeed(1.25)}>1.25</button>
          <button onClick={() => onHandleSpeed(1.5)}>1.5</button>
        </div>
        <p className='text-base'>Guide Vocal</p>
        <input
          type='checkbox'
          checked={isChecked}
          className='relative w-12 h-6 bg-secondary appearance-none cursor-pointer rounded-3xl checked:bg-primary'
          onChange={guideVocal}
        />
      </div>
      {/* Panel */}

      <div className='mt-3 audio-player relative flex md:w-1/2 w-4/5 h-20 mx-auto rounded-[40px] bg-dark border-8 border-primary text-white'>
        <div
          className='timeline bg-white w-5/6 h-2 cursor-pointer absolute -top-2 left-1/2 -translate-x-1/2 z-10'
          onClick={(e) => onHandleTimelineUpdate(e)}
        >
          <div
            className='progress transition h-2 bg-primary'
            style={{
              width: `${(accompanimentID.currentTime / duration) * 100}%`,
            }}
          ></div>
          <div
            className='progress-ball absolute w-3 h-3 -top-0.5 bg-primary rounded-xl'
            style={{
              left: `${(accompanimentID.currentTime / duration) * 100 - 2}%`,
            }}
          ></div>
        </div>
        <div className='controls px-5 flex justify-between items-center my-1 w-full'>
          <div className='play-container bg-primary w-12 h-12 rounded-full'>
            <img
              className='w-2/5 h-auto cursor-pointer transition hover:scale-105'
              onClick={() => onHandlePlay()}
              src={isPlaying ? stop : start}
              alt={isPlaying ? 'Start' : 'Stop'}
            />
          </div>
          <div className='time'>
            <div>
              {displayTime} / {timeFormat(duration)}
            </div>
          </div>
          <div className='name'>Music Song</div>
          <div className='volume-container cursor-pointer relative z-10'>
            <div className='volume-button'>
              <div className='volume icono-volumeMedium'></div>
            </div>

            <div className='volume-slider'>
              <div className='volume-percentage'></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
