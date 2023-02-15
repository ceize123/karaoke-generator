import React, { useState, useEffect } from 'react';
import './style/style.css';
import { search, download, spleeter } from './components/apis';
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

	const download = async () => {
		setData()
		setStatus('Downloading...')
		
		const responseDownload = await download(searchRes.url)
		
		
		console.log(responseDownload)
		setStatus('Spleeting...')
		const responseSpleeter = await spleeter(searchRes.id, searchRes.title)
		
		setStatus('Success!')
		console.log(responseSpleeter)
		setData(URL.createObjectURL(responseSpleeter))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const inputVal = e.target.val.value
		if (!isValidHttpUrl(inputVal)) {
			const res = await search(inputVal)
			setSearchRes(res.videos)
		} else {
			const res = await search(inputVal, true)
			setSearchRes(res.video)
			console.log(res.video)
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

	// Create uuid
	useEffect(() => {
		// console.log(sessionStorage.result)
		if (sessionStorage.uid === undefined) {
			const uid = {'uid': uuidv4()};
			sessionStorage.setItem('uid', JSON.stringify(uid));
		}
		const intervalId = setInterval(() => {
			const obj = JSON.parse(sessionStorage.uid);
			console.log(obj)
		}, 5000)
		return () => clearInterval(intervalId)
	}, [])

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
		</main>
	)
}

export default App;