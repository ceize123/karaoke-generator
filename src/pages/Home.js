import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import SearchSection from '../components/Search-Section'
import { v4 as uuidv4 } from 'uuid'
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
        {/* Output */}
      </main>
    </div>
  )
}

export default Home
