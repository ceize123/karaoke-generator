// https://stackoverflow.com/questions/42458434/how-to-set-build-env-variables-when-running-create-react-app-build-script
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : ''
console.log(apiUrl)

// Call api search
export async function search(keyword) {
	const responseSearch = await fetch(
		`${apiUrl}/search`,
		{
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Headers': '*',
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Methods': '*'   
			},
			body: JSON.stringify(keyword)
		}
	);
	return await responseSearch.json() // Extracting data as a JSON Object from the response
}

// Call api download
export async function download(url) {
	const responseDownload = await fetch(
		`${apiUrl}/download`,
		{
			method: 'POST',
			mode: 'no-cors',
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
		`${apiUrl}/spleet`,
		{
			method: 'POST',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(res),
			responseType: "blob",
		}
	);
	return await responseSpleeter.blob()
}