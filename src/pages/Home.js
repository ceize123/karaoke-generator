import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import SearchSection from '../components/Search-Section'
import { v4 as uuidv4 } from 'uuid'
// import bgBar from '../img/bg-input-bar.png'
import BGPattern from '../components/BG-Pattern'
import ErrorMsg from '../components/Error-Msg'
import Form from '../components/Form'
import AudioSection from '../components/Audio-Section'

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
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState('')
  const [active, setActive] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setData()
    setSearchRes([])
    const keyword = e.target.music.value
    if (keyword === '') {
      setError('empty')
      return
    }

    setProcessing(true)
    setComplete(false)
    setError('')
    const data = {
      val: keyword,
      isUrl: isValidHttpURL(keyword),
    }

    try {
      const res = await MusicDataService.search(data)
      setSearchRes(res.data.videos)
      setProcessing(false)
    } catch {
      setProcessing(false)
      setError('search')
    }
  }

  const onHandleDownload = async (id) => {
    const index = searchRes.findIndex((item) => item.id === id)
    const url = searchRes[index].url
    console.log(url)
    setData()
    setProcessing(true)
    setError('')
    setStatus('Downloading...')
    setComplete(false)

    const data = {
      url: url,
    }

    try {
      const res = await MusicDataService.download(data)
      console.log(res.data)
      addToTask(index)
    } catch {
      setError('download')
      setProcessing(false)
    }
  }

  const addToTask = async (index) => {
    setStatus('Spleeting...')
    const data = {
      uid: JSON.parse(sessionStorage.uid)['uid'],
      video_id: searchRes[index].id,
      video_title: searchRes[index].title,
    }
    setError('')
    console.log(data)

    try {
      setActive(true)
      const res = await MusicDataService.generate(data)
      console.log(res)
      setData(URL.createObjectURL(res.data))
      setStatus('Done!')
      setProcessing(false)
      setSearchRes([searchRes[index]])
      setComplete(true)
    } catch {
      setError('download')
      setProcessing(false)
    }
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
        {/* Form */}
        <Form handleSubmit={handleSubmit} processing={processing} />
        {/* <section className='w-full h-[60vh] md:max-h-[500px] max-h-[350px] relative grid sm:grid-cols-12 3xl:grid-cols-1 items-end'>
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
                    className='bg-primary absolute right-3.5 top-1/2 -translate-y-1/2 hidden sm:block disabled:opacity-75'
                    type='submit'
                    disabled={processing}
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
        </section> */}
        {/* Form */}

        <p className='text-center'>{status}</p>

        {/* Error */}
        {error !== '' && <ErrorMsg error={error} />}
        {/* Error */}

        {/* Search Result */}
        {searchRes.length > 0 && (
          <SearchSection
            res={searchRes}
            onHandleClick={onHandleDownload}
            processing={processing}
            complete={complete}
          />
        )}
        {/* Search Result */}

        {/* Output */}
        {typeof data !== 'undefined' && (
          <AudioSection data={data} info={searchRes[0]} />
        )}
        {/* <section>
          {typeof data !== 'undefined' && (
            <div>
              <p>{data}</p>
              <audio controls>
                <source src={data} type='audio/x-wav' />
              </audio>
            </div>
          )}
        </section> */}
        {/* Output */}
      </main>
    </div>
  )
}

export default Home
