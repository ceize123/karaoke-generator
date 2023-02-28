import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import { SearchSec, SearchSecSingle } from '../components/Search-Sec'
import { v4 as uuidv4 } from 'uuid'
import pattern from '../img/bg-pattern.png'
import orbit from '../img/orbit.png'
import bgBar from '../img/bg-input-bar.png'

function isValidHttpURL(string) {
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
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(false)

    const keyword = e.target.music.value
    console.log(keyword)
    const data = {
      val: keyword,
      isUrl: isValidHttpURL(keyword),
    }

    try {
      const res = await MusicDataService.search(data)
      setSearchRes(res.data.videos)
    } catch {
      setError(true)
    }
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
      <div className='absolute top-0 right-0 w-[45vw] max-w-4xl'>
        <div className='relative flex justify-end'>
          <div className='w-4/5'>
            <img className='w-full h-auto' src={pattern} alt='pattern' />
          </div>
          <div className='triangle text-pink absolute top-0 left-0'></div>
          <div className='triangle triangle2 text-pink absolute top-[20vh] left-[5vw] 3xl:hidden'></div>
          <img
            className='w-[7vw] max-w-[200px] orbit absolute bottom-2 left-[15vw] 2xl:left-56'
            src={orbit}
            alt='orbit'
          />
        </div>
      </div>
      <main>
        <section className='w-full h-screen relative grid sm:grid-cols-12 2xl:grid-cols-1 items-center'>
          <form
            onSubmit={handleSubmit}
            className='text-center sm:col-span-8 2xl:col-span-1 sm:col-start-2 mx-3 sm:mx-0'
          >
            <div>
              <h1 className='mb-2'>Karaoke Generator</h1>
              <p className='lg:mb-4 mb-2'>Easily remove vocals from music</p>
              <div
                className='w-full flex justify-center items-center sm:h-[6vw] max-h-[75px] h-12'
                style={{
                  background: `url(${bgBar}) no-repeat center center / contain`,
                }}
              >
                <input
                  className='border-4 border-primary py-1 px-4 2xl:w-3/5 sm:w-[93%] w-4/5 rounded-3xl'
                  type='text'
                  id='music'
                  name='music'
                  placeholder='Youtube link, song, any key words'
                />
              </div>
            </div>
            <button className='bg-primary' type='submit'>
              Search
            </button>
          </form>
        </section>
        {searchRes.length > 0 && (
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
