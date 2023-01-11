import React, { useState } from 'react';
import "./style/style.css";
import Video from "./components/Video";

function App() {
	const [status, setStatus] = useState('')
	const [data, setData] = useState()

	async function callAPI(url) {
		setData()
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
				},
				body: JSON.stringify(data),
				responseType: "blob",
			}
		);
		const result = await responseSpleeter.blob()
		
		setStatus('Success...')
		// const blob = result.blob()

		console.log(result)
		// console.log(result.body.getReader())
		setData(URL.createObjectURL(result))
		// setData(URL.createObjectURL(new Blob([blob], {type: 'audio/wav'})))
		// setData(result)
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