import React, { useState } from 'react';
import "./style/style.css";

// Call api download
async function download(url) {
	const responseDownload = await fetch(
		'/download',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(url)
		}
	);
	return await responseDownload.json() // Extracting data as a JSON Object from the response
}

// Call api spleet
async function spleeter(res) {
	// https://stackoverflow.com/questions/68230294/how-can-i-play-audio-file-sent-from-flask-send-file
	const responseSpleeter = await fetch(
		'/spleet',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(res),
			responseType: "blob",
		}
	);
	return await responseSpleeter.blob()
}

function App() {
	const [status, setStatus] = useState('')
	const [data, setData] = useState()

	async function callAPI(url) {
		setData()
		setStatus('Downloading...')
		
		let responseDownload
		try {
			responseDownload = await download(url)
		} catch (e) {
			setStatus('Duration is exceeded... Video must shorter than 10 mins.')
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
								placeholder="Paste Your Link Here"
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