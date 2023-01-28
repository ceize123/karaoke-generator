import React, { useState, useEffect } from 'react';
import './style/style.css';
import { search, download, spleeter } from './components/apis';
import {SearchSec, SearchSecSingle} from './components/Search-Sec';

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
	const [searchRes, setSearchRes] = useState([])
	const [downloading, setDownloading] = useState(false)

	const handleDownload = async (url) => {
		setData()
		setStatus('Downloading...')
		
		let responseDownload
		try {
			responseDownload = await download(url)
		} catch (e) {
			setStatus('Duration is exceeded... Video must shorter than 15 mins.')
		}
		
		console.log(responseDownload)
		setStatus('Spleeting...')
		const responseSpleeter = await spleeter(responseDownload)
		
		setStatus('Success!')
		console.log(responseSpleeter)
		setData(URL.createObjectURL(responseSpleeter))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const inputVal = e.target.val.value
		console.log(inputVal)
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
	}

	const onHandleDownload = (res) => {
		setDownloading(res)
		handleDownload(searchRes.url)
	}

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
			<section className='w-full flex justify-center my-8'>
				{searchRes && searchRes.length > 1
					? <SearchSec res={searchRes} onHandleChange={onHandleChange} />
					: <SearchSecSingle res={searchRes} onHandleChange={onHandleDownload} />
				}
			</section>
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