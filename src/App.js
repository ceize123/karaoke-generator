import React, { useState } from 'react';
import "./style/style.css";
import Video from "./components/Video";

function App() {
	const [status, setStatus] = useState('')
	const [data, setData] = useState('')

	async function callAPI(url) {
		setStatus('Downloading...')
		const responseDownload = await fetch(
			'/download',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify(url)
			}
		);
		const data = await responseDownload.json(); // Extracting data as a JSON Object from the response

		setStatus('Spleeting...')
		const responseSpleeter = await fetch(
			'/spleet',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: JSON.stringify(data)
			}
		);
		const result = await responseSpleeter.json(); // Extracting data as a JSON Object from the response

		setStatus('Success...')
		setData(result.filename)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		callAPI(e.target.url.value)
		// setStatus('Downloading...')
		// fetch("/download",{
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 		// 'Content-Type': 'application/x-www-form-urlencoded',
		// 	},
		// 	body: JSON.stringify(e.target.url.value)
		// })
		// .then(res => {
		// 	setStatus('Spleeting...')
		// 	res.json()
		// })
		// .then(data => {
		// 	fetch("/spleet",{
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json'
		// 		},
		// 		body: JSON.stringify(data)
		// 	})
		// })
		// .then(res => res.json())
		// .then(data => {
		// 	setStatus('Success!')
		// 	setData(data.filename)
		// 	console.log(data)
		// })
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="url">URL:</label>
					<input type="text" id="url" name="url" />
				</div>
				<button type="submit">Submit</button>
			</form>
			{/* <div>
				<Video />
			</div> */}
			<p>{status}</p>
			{typeof data !== 'undefined' && <p>{data}</p> }
		</div>
	)
}

export default App;