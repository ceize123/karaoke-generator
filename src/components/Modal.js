import { useState, useEffect } from 'react'
// import { Adsense } from '@ctrl/react-adsense'

export default function Modal({ status, setComplete }) {
  const [progress, setProgress] = useState(7)
  useEffect(() => {
    const progressInterval = setInterval(() => {
      if (status === 'Downloading' && progress < 50) {
        setProgress(progress + 1)
      } else if (status === 'Processing') {
        if (progress >= 50 && progress < 97) {
          setProgress(progress + 1)
        } else if (progress < 50) {
          setProgress(50)
        }
      } else if (status === 'Done') {
        if (progress >= 97 && progress < 100) {
          setProgress(progress + 1)
        } else if (progress < 97) {
          setProgress(97)
        }
      } else if (status === 'Searching' && progress < 97) {
        setProgress(progress + 1)
      }
    }, 500)

    return () => clearInterval(progressInterval) //This is important
  }, [status, progress])

  useEffect(() => {
    if (progress === 100) setComplete(true)
  }, [progress, setComplete])

  return (
    <div className='w-screen h-screen backdrop-blur-sm bg-white/20 fixed top-0 left-0 z-50 flex items-center justify-center'>
      <div className='modal bg-[#2C2C2C] md:w-1/2 w-11/12 h-1/2 flex flex-col items-center justify-center rounded-lg'>
        <h2 className='mb-3 relative'>
          {/* <h2 data-text={`${status}...`} className='mb-3 relative'> */}
          {status}
          {/* https://codepen.io/chris22smith/pen/pQxjoB */}
          <span className='loading absolute'>...</span>
        </h2>
        {/* https://codepen.io/LauraBizzle/pen/wvEMqVN */}
        <div className='relative w-80 h-10 p-1 bg-secondary rounded-3xl border-2 shadow-[0_0_16px_#FA4BC9] flex items-center'>
          <div
            className='h-full bg-pink rounded-2xl transition-width ease'
            style={{ width: `${progress}%` }}
          ></div>
          <span className='absolute left-1/2 -translate-x-1/2'>
            {progress}%
          </span>
          {/* <Adsense client='ca-pub-7038926895807473' slot='7259870550' /> */}
        </div>
      </div>
    </div>
  )
}
