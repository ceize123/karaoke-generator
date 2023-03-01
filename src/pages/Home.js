import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import { SearchSec, SearchSecSingle } from '../components/Search-Sec'
import { v4 as uuidv4 } from 'uuid'
import bgBar from '../img/bg-input-bar.png'
import BGPattern from '../components/BG-Pattern'

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
      <BGPattern />
      <main>
        <section className='w-full h-[60vh] md:max-h-[500px] max-h-[350px] relative grid sm:grid-cols-12 3xl:grid-cols-1 items-end'>
          <form
            onSubmit={handleSubmit}
            className='text-center sm:col-span-8 3xl:col-span-1 sm:col-start-2 mx-1.5 sm:mx-0'
          >
            <div>
              <h1 className='mb-2'>Karaoke Generator</h1>
              <p className='lg:mb-4 mb-2'>Easily remove vocals from music</p>
              <div
                className='sm:w-full w-[340px] flex justify-center items-center sm:h-[6vw] max-h-[75px] mx-auto'
                style={{
                  background: `url(${bgBar}) no-repeat center center / contain`,
                }}
              >
                <div className='relative 3xl:w-3/5 sm:w-11/12 w-[320px]'>
                  <input
                    className='border-4 border-primary lg:py-4 py-2 px-5 w-full rounded-[40px]'
                    type='text'
                    id='music'
                    name='music'
                    placeholder='Youtube link, song, any key words'
                  />
                  <button
                    className='bg-primary absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:block'
                    type='submit'
                  >
                    Search
                  </button>
                </div>
              </div>
              <button
                className='bg-primary sm:hidden inline text-center mt-3'
                type='submit'
              >
                Search
              </button>
            </div>
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
