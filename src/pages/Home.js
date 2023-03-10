import React, { useState, useEffect } from 'react'
import '../style/style.css'
import MusicDataService from '../services/music.service'
import ResultMusicSection from '../components/Result-Music-Section'
import { v4 as uuidv4 } from 'uuid'
import BGPattern from '../components/BG-Pattern'
import ErrorMsg from '../components/Error-Msg'
import MusicForm from '../components/Search-Music-Form'
import AudioPlayer from '../components/Audio-Player'
import Modal from '../components/Modal'
import Footer from '../components/Footer'

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
  const [modal, setModal] = useState(false)
  const [accompaniment, setAccompaniment] = useState()
  const [vocal, setVocal] = useState()
  const [searchRes, setSearchRes] = useState([])
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [error, setError] = useState('')
  const [active, setActive] = useState(false)

  const beginState = (option) => {
    setAccompaniment()
    setVocal()
    setProcessing(true)
    setStatus(option)
    setError('')
    setModal(true)
    setComplete(false)
  }

  const errorState = (err) => {
    setProcessing(false)
    setStatus('')
    setError(err)
    setModal(false)
  }

  // Search
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSearchRes([])
    const keyword = e.target.music.value
    if (keyword === '') {
      setError('Empty')
      return
    }
    beginState('Searching')

    const data = {
      val: keyword,
      isUrl: isValidHttpURL(keyword),
    }

    try {
      const res = await MusicDataService.search(data)
      setSearchRes(res.data.videos)
      setStatus('Done')
      if (res.data.videos.length === 0) setError('No Result')
    } catch {
      errorState('Search')
    }
  }

  // Download audio from youtube
  const onHandleDownload = async (id) => {
    const index = searchRes.findIndex((item) => item.id === id)
    const url = searchRes[index].url
    beginState('Downloading')

    const data = {
      url: url,
    }

    try {
      await MusicDataService.download(data)
      musicSplit(index)
    } catch {
      errorState('Download')
    }
  }

  // Process split vocal
  const musicSplit = async (index) => {
    setStatus('Processing')
    const data = {
      uid: JSON.parse(sessionStorage.uid)['uid'],
      video_id: searchRes[index].id,
      video_title: searchRes[index].title,
    }
    setError('')

    try {
      setActive(true)
      const accompaniment = await MusicDataService.generate(data)
      const vocal = await MusicDataService.get_vocal(data)
      setStatus('Done')
      setSearchRes([searchRes[index]])
      if (accompaniment.data.size < 1000) {
        setError('Split')
        return
      }
      setAccompaniment(URL.createObjectURL(accompaniment.data))
      setVocal(URL.createObjectURL(vocal.data))
    } catch (e) {
      console.log(e)
      errorState('Download')
    }
  }

  useEffect(() => {
    if (complete) {
      setModal(false)
      setStatus('')
      setProcessing(false)
    }
  }, [complete])

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
    if (active) {
      MusicDataService.unload(ses['uid'])
    }
  })

  return (
    <>
      <div className='container max-w-7xl mx-auto'>
        <BGPattern />
        <main>
          {/* Form */}
          <MusicForm handleSubmit={handleSubmit} processing={processing} />
          {/* Form */}

          {modal && <Modal status={status} setComplete={setComplete} />}

          {/* Error */}
          {error !== '' && <ErrorMsg error={error} />}
          {/* Error */}

          {/* Search Result */}
          {searchRes.length > 0 && (
            <ResultMusicSection
              res={searchRes}
              onHandleClick={onHandleDownload}
              processing={processing}
              hasAudio={
                typeof accompaniment !== 'undefined' && error !== 'Split'
              }
            />
          )}
          {/* Search Result */}

          {/* Output */}
          {typeof accompaniment !== 'undefined' && error === '' && (
            <section>
              <AudioPlayer
                accompaniment={accompaniment}
                vocal={vocal}
                duration={searchRes[0]['duration']}
              />
            </section>
          )}
          {/* Output */}
        </main>
      </div>
      <Footer initial={searchRes.length === 0} />
    </>
  )
}

export default Home
