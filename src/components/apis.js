// Call api search
export async function search(url) {
	const responseSearch = await fetch(
		'/search',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(url)
		}
	);
	return await responseSearch.json() // Extracting data as a JSON Object from the response
}

// Call api download
export async function download(url) {
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
export async function spleeter(res) {
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