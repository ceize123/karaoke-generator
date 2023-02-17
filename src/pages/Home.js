import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import { SearchSec, SearchSecSingle } from '../components/Search-Sec'
import { v4 as uuidv4 } from 'uuid'

function isValidHttpUrl(string) {
  let url
  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === 'http:' || url.protocol === 'https:'
}

function Home() {
  const [status, setStatus] = useState('')
  const [data, setData] = useState()
  const [searchRes, setSearchRes] = useState([])
  const [downloading, setDownloading] = useState(false)
  const [error, setError] = useState(false)
  const [active, setActive] = useState(false)

  const download = async () => {
    setData()
    setError(false)
    setStatus('Downloading...')

    const data = {
      url: searchRes[0].url,
    }

    try {
      const res = await MusicDataService.download(data)
      console.log(res.data)
      addToTask()
    } catch {
      setError(true)
    }

    // MusicDataService.download(data)
    // 	.then((res) => {
    // 		console.log(res.data)
    // 	}).then(() => {
    // 		addToTask()
    // 	}).catch((e) => {
    // 		console.log(e)
    // 		setError(true)
    // 	})
  }

  const addToTask = async () => {
    setStatus('Spleeting...')
    const data = {
      uid: JSON.parse(sessionStorage.uid)['uid'],
      video_id: searchRes[0].id,
      video_title: searchRes[0].title,
    }

    try {
      setActive(true)
      const res = await MusicDataService.generate(data)
      console.log(res)
      setData(URL.createObjectURL(res.data))
    } catch {
      setError(true)
    }
    // MusicDataService.generate(data)
    // 	.then((res) => {
    // 		setData(URL.createObjectURL(res.data))
    // 		setStatus('Success!')
    // 		setActive(false)
    // 	}).catch((e) => {
    // 		console.log(e)
    // 		setError(true)
    // 	})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)
    const inputVal = e.target.val.value
    const data = {
      val: inputVal,
      isUrl: isValidHttpUrl(inputVal),
    }

    try {
      const res = await MusicDataService.search(data)
      setSearchRes(res.data.videos)
    } catch {
      setError(true)
    }
    // MusicDataService.search(data)
    // 	.then((res) => {
    // 		console.log(res.data.videos)
    // 		setSearchRes(res.data.videos)
    // 	}).catch((e) =>{
    // 		console.log(e)
    // 		setError(true)
    // 	})
  }

  const onHandleChange = (res) => {
    setSearchRes([res])
  }

  const onHandleDownload = (res) => {
    setDownloading(res)
    console.log(searchRes)
    download()
  }

  // Create uuid
  useEffect(() => {
    if (sessionStorage.uid === undefined) {
      const uid = { uid: uuidv4() }
      sessionStorage.setItem('uid', JSON.stringify(uid))
    }
    setActive(false)
    // const intervalId = setInterval(() => {
    //   const obj = JSON.parse(sessionStorage.uid)
    //   console.log(obj)
    // }, 5000)
    // return () => clearInterval(intervalId)
  }, [])

  window.addEventListener('beforeunload', () => {
    const ses = JSON.parse(sessionStorage.uid)
    console.log(active)
    if (active) {
      MusicDataService.unload(ses['uid'])
    }
  })

  return (
    <div className='container max-w-7xl mx-auto'>
      <main className=' flex items-center flex-col'>
        <section className='mt-10 max-w-5xl w-1/2'>
          <form onSubmit={handleSubmit} className='text-center'>
            <div>
              <label htmlFor='val' className='block text-5xl mb-3'>
                YouTube Video Converter
              </label>
              <input
                className='block border-2 p-2 w-full rounded-md mb-3'
                type='text'
                id='val'
                name='val'
                placeholder='Paste Your Link Here'
              />
            </div>
            <button
              className='inline-flex items-center rounded-md border border-transparent 
                            bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm
                            hover:bg-gray-700 focus:outline-none focus:ring-2
                            focus:ring-gray-500 focus:ring-offset-2'
              type='submit'
            >
              Search
            </button>
          </form>
        </section>
        {searchRes && (
          <section className='w-full flex justify-center my-8'>
            {searchRes.length === 1 ? (
              <SearchSecSingle
                res={searchRes[0]}
                onHandleChange={onHandleDownload}
              />
            ) : (
              <SearchSec res={searchRes} onHandleChange={onHandleChange} />
            )}
          </section>
        )}
        <section>
          <p>{status}</p>
          {typeof data !== 'undefined' && (
            <div>
              <p>{data}</p>
              <audio controls>
                <source src={data} type='audio/x-wav' />
              </audio>
            </div>
          )}
        </section>
        {error && <p>Something went wrong...</p>}
      </main>
    </div>
  )
}

export default Home
