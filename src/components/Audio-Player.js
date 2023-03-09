import { useState, useEffect, useRef } from 'react'
import timeFormat from '../helpers'
import start from '../img/start.png'
import stop from '../img/stop.png'
import sound from '../img/sound.png'
import mute from '../img/mute.png'

export default function AudioPlayer({ accompaniment, vocal, duration }) {
  const accompanimentRef = useRef(null)
  const vocalRef = useRef(null)
  const timelineRef = useRef(null)
  const volumeRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isGuiding, setIsGuiding] = useState(false)
  const [displayTime, setDisplayTime] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const [isMute, setIsMute] = useState(false)

  // Get current play time of the accompaniment
  const timeUpdate = (event) => {
    setDisplayTime(event.target.currentTime)
  }

  //click on timeline to skip around
  const onHandleTimelineUpdate = (e) => {
    // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    const timeline = timelineRef.current
    const rect = timeline.getBoundingClientRect()
    const timelineWidth = rect.width
    const timeToSeek =
      ((e.clientX - rect.left) / parseInt(timelineWidth)) * duration
    accompanimentRef.current.currentTime = timeToSeek
    vocalRef.current.currentTime = timeToSeek
  }

  const onHandlePlay = () => {
    setIsPlaying(!isPlaying)
    if (accompanimentRef.current.paused) {
      accompanimentRef.current.play()
      if (isGuiding) vocalRef.current.play()
    } else {
      accompanimentRef.current.pause()
      vocalRef.current.pause()
    }
  }

  const onHandleTime = (sec) => {
    accompanimentRef.current.currentTime += sec
    vocalRef.current.currentTime = accompanimentRef.current.currentTime
  }

  const onHandleVolumeUpdate = (e) => {
    // https://stackoverflow.com/questions/3234256/find-mouse-position-relative-to-element
    const vol = volumeRef.current
    const rect = vol.getBoundingClientRect()
    const volumeWidth = rect.width
    const newVolume = (e.clientX - rect.left) / parseInt(volumeWidth)
    setVolume(newVolume)
    accompanimentRef.current.volume = newVolume
    vocalRef.current.volume = newVolume
  }

  const onHandleMute = () => {
    setIsMute(!isMute)
    accompanimentRef.current.muted = !accompanimentRef.current.muted
  }

  // Toggle guide vocal
  const guideVocal = () => {
    setIsGuiding(!isGuiding)
  }

  useEffect(() => {
    isGuiding && isPlaying ? vocalRef.current.play() : vocalRef.current.pause()

    if (isPlaying) {
      vocalRef.current.currentTime = accompanimentRef.current.currentTime
      const intervalId = setInterval(() => {
        vocalRef.current.currentTime = accompanimentRef.current.currentTime
      }, 5000)

      return () => clearInterval(intervalId)
    }
  }, [isGuiding, isPlaying])

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

      {/* Custom Audio Player */}
      <div className=' mt-3 audio-player relative flex sm:w-3/5 w-11/12 h-20 mx-auto rounded-[40px] bg-dark border-8 border-primary text-white'>
        {/* Timeline */}
        <div
          ref={timelineRef}
          className='timeline bg-white w-5/6 h-2 cursor-pointer absolute -top-2 left-1/2 -translate-x-1/2 z-10'
          onClick={(e) => onHandleTimelineUpdate(e)}
        >
          <div
            className='progress transition-all h-2 bg-primary -translate-x-[1px]'
            style={{
              width: `${(displayTime / duration) * 100}%`,
            }}
          ></div>
          <div
            className='progress-ball absolute transition-all w-4 h-4 -top-1 bg-primary rounded-xl'
            style={{
              left: `${(displayTime / duration) * 100 - 2}%`,
            }}
          ></div>
        </div>
        {/* Timeline */}

        <div className='controls px-5 flex justify-between items-center sm:my-1 my-2 w-full'>
          {/* Start, Stop */}
          <div
            className='play-container panel-button-bg sm:w-12 sm:h-12 w-10 h-10 cursor-pointer flex justify-center items-center'
            onClick={() => onHandlePlay()}
          >
            <img
              className='w-2/5 h-auto transition hover:scale-105'
              src={isPlaying ? stop : start}
              alt={isPlaying ? 'Start' : 'Stop'}
            />
          </div>
          {/* Start, Stop */}

          {/* Time */}
          <div className='time flex justify-center items-center'>
            <div className='panel-button-bg w-8 h-8 flex justify-center'>
              <button className='text-xs' onClick={() => onHandleTime(-5)}>
                -5s
              </button>
            </div>
            <div className='lg:mx-4 mx-1.5'>
              <p className='text-base'>
                {timeFormat(displayTime)} / {timeFormat(duration)}
              </p>
            </div>
            <div className='panel-button-bg w-8 h-8 flex justify-center'>
              <button className='text-xs' onClick={() => onHandleTime(5)}>
                +5s
              </button>
            </div>
          </div>
          {/* Time */}

          {/* Volume */}
          <div className='volume-container relative z-10 hidden md:flex justify-center items-center'>
            <div
              className='volume-button panel-button-bg w-8 h-8 flex justify-center items-center cursor-pointer'
              onClick={() => onHandleMute()}
            >
              <div className='volume'>
                <img
                  className='w-full h-auto transition hover:scale-105'
                  src={!isMute ? sound : mute}
                  alt='sound'
                />
              </div>
            </div>

            <div
              ref={volumeRef}
              className='volume-slider w-16 h-2.5 -translate-x-[1px] rounded bg-white cursor-pointer'
              onClick={(e) => onHandleVolumeUpdate(e)}
            >
              <div
                className='volume-percentage bg-primary rounded-tr rounded-br h-full transition-all'
                style={{ width: `${volume * 100}%` }}
              ></div>
            </div>
          </div>
          {/* Volume */}

          {/* Guide Vocal */}
          <div className='flex justify-center items-center'>
            <input
              type='checkbox'
              checked={isGuiding}
              className='relative lg:w-20 w-12 lg:h-8 h-6 bg-secondary appearance-none cursor-pointer rounded-3xl checked:bg-primary 
              before:bg-white before:absolute before:left-0 before:lg:-top-1 before:top-0 before:transition-all before:lg:w-10 before:lg:h-10 before:w-6 before:h-6 before:rounded-full checked:before:translate-x-[100%]'
              onChange={guideVocal}
            />
          </div>
          {/* Guide Vocal */}
        </div>
      </div>
      {/* Custom Audio Player */}
    </>
  )
}
