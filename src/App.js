import React, { useState, useEffect } from 'react';
import './style/style.css';
import { callSearchAPI, callDownloadAPI, callAddTaskAPI, callUnloadAPI } from './components/apis';
import {SearchSec, SearchSecSingle} from './components/Search-Sec';
import { v4 as uuidv4 } from 'uuid';

function isValidHttpUrl(string) {
	let url;
	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

function App() {
	const [status, setStatus] = useState('')
	const [data, setData] = useState()
	const [searchRes, setSearchRes] = useState()
	const [downloading, setDownloading] = useState(false)
	const [error, setError] = useState(false)
	const uid = uuidv4()

	const download = async () => {
		setData()
		setError(false)
		setStatus('Downloading...')
		
		try {
			const responseDownload = await callDownloadAPI(searchRes.url)
			console.log(responseDownload)
			addToTask()
		} catch  {
			setError(true)
		}
	}

	const addToTask = async () => {
		setStatus('Spleeting...')
		try {
			handleSession(true)
			const responseSpleeter = await callAddTaskAPI(JSON.parse(sessionStorage.entries)['uid'], searchRes.id, searchRes.title)
			setStatus('Success!')
			console.log(responseSpleeter)
			setData(URL.createObjectURL(responseSpleeter))
		} catch {
			setError(true)
		}
		handleSession(false)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(false)
		const inputVal = e.target.val.value
		console.log(inputVal)
		try {
			if (!isValidHttpUrl(inputVal)) {
				const res = await callSearchAPI(inputVal)
				setSearchRes(res.videos)
			} else {
				const res = await callSearchAPI(inputVal, true)
				console.log(res)
			}
		} catch (e) {
			console.log(e)
			setError(true)
		}
	}

	const onHandleChange = (res) => {
		setSearchRes(res)
		// const result = {'result': res};
		// sessionStorage.setItem('result', JSON.stringify(result));
	}

	const onHandleDownload = (res) => {
		setDownloading(res)
		console.log(searchRes)
		download()
	}

	const handleSession = (active) => {
		const entries = { 'uid': uid, 'active': active }
		sessionStorage.setItem('entries', JSON.stringify(entries))
	}

	// Create uuid
	useEffect(() => {
		
		if (sessionStorage.entries === undefined) {
			handleSession(false)
		}

		// const intervalId = setInterval(() => {
		// 	const obj = JSON.parse(sessionStorage.entries)
		// 	console.log(obj)
		// }, 5000)
		// return () => clearInterval(intervalId)
	})

	window.addEventListener('beforeunload', () => {
		const obj = JSON.parse(sessionStorage.entries)
		if (obj['active']) {
			callUnloadAPI(obj['uid'])
			handleSession(false)
			console.log('API call before page reload')
		}
	});

	return (
		<main className='container max-w-7xl mx-auto flex items-center flex-col'>
			<section className='mt-10 max-w-5xl w-1/2'>
				<form onSubmit={handleSubmit} className='text-center'>
					<div>
						<label htmlFor='val' className='block text-5xl mb-3'>YouTube Video Converter</label>
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
							focus:ring-gray-500 focus:ring-offset-2' type='submit'
					>
					Search
					</button>
				</form>
			</section>
			{searchRes && <section className='w-full flex justify-center my-8'>
				{searchRes.length > 1
					? <SearchSec res={searchRes} onHandleChange={onHandleChange} />
					: <SearchSecSingle res={searchRes} onHandleChange={onHandleDownload} />
				}
			</section>}
			<section>
				<p>{status}</p>
				{typeof data !== 'undefined' &&
					<div>
						<p>{data}</p>
						<audio controls>
							<source src={data} type='audio/x-wav'/>
						</audio>
					</div>
				}
			</section>
			{error && <p>Something went wrong...</p>}
		</main>
	)
}

export default App;