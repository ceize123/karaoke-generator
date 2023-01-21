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
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="url">URL:</label>
					<input className='border-2' type="text" id="url" name="url" />
				</div>
				<button type="submit">Submit</button>
			</form>
			<p>{status}</p>
			{/* <audio controls preload="auto">
				<source src="http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3" type="audio/mp3"/>
			</audio> */}
			{typeof data !== 'undefined' &&
				<div>
					<p>{data}</p>
					<audio controls>
						<source src={data} type="audio/x-wav"/>
					</audio>
				</div>
			}
		</div>
	)
}

export default App;