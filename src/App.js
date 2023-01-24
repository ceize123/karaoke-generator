import React, { useState, useEffect } from 'react';
import "./style/style.css";
import { search, download, spleeter } from './components/apis';

function App() {
	const [status, setStatus] = useState('')
	const [data, setData] = useState()
	const [searchRes, setSearchRes] = useState([])
	const [val, setVal] = useState('')
	let isComposition = false

	async function callAPI(url) {
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

	const handleSubmit = (e) => {
		e.preventDefault()
		callAPI(e.target.url.value)
	}

	const handleChange = (e) => {
		const inputVal = e.target.value
		if (!isComposition && !inputVal.includes('https:')) {
			setVal(e.target.value)
		}
	}

	const handleComposition = (e) => {
		if (e.type === 'compositionend') {
			isComposition = false
		if (!isComposition) {
			handleChange(e)
		}
		} else {
			isComposition = true
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			const res = await search(val)
			setSearchRes(res.videos)
		}

		if (val.length > 1) {
			fetchData()
		}
	}, [val]);

	return (
		<div className='flex justify-center'>
			<main className='container flex justify-center'>
				<div className='mt-10'>
					<form onSubmit={handleSubmit} className='text-center'>
						<div>
							<label htmlFor='url' className='block text-5xl mb-3'>YouTube Video Converter</label>
							<input
								className='block border-2 p-2 w-full rounded-md mb-3'
								type='text'
								id='url'
								name='url'
								placeholder='Paste Your Link Here'
								// Handle chinese spelling issue
								// https://juejin.cn/post/6861098174723915790
								onCompositionStart={handleComposition}
          						onCompositionEnd={handleComposition}
								onChange={handleChange}
							/>
						</div>
						<button
							className='inline-flex items-center rounded-md border border-transparent 
								bg-gray-600 px-4 py-2 text-base font-medium text-white shadow-sm
								hover:bg-gray-700 focus:outline-none focus:ring-2
								focus:ring-gray-500 focus:ring-offset-2' type='submit'
						>
						Download
						</button>
					</form>
					{searchRes && searchRes.map((item, idx) => {
						return (
							<div key={idx}>
								<p>{item.title}</p>
								<img
									src={item.thumbnail}
									alt={item.title} />
							</div>
						)

					})}
					<p>{status}</p>
					{typeof data !== 'undefined' &&
						<div>
							<p>{data}</p>
							<audio controls>
								<source src={data} type='audio/x-wav'/>
							</audio>
						</div>
					}

				</div>
			</main>
		</div>
	)
}

export default App;