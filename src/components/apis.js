// https://stackoverflow.com/questions/42458434/how-to-set-build-env-variables-when-running-create-react-app-build-script
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.local.REACT_APP_PROD_API_URL : ''
console.log(process.env.NODE_ENV)
console.log(apiUrl)

const headers = {
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': process.env.local.REACT_APP_PROD_API_URL,
	'Access-Control-Request-Headers': 'Content-Type, Authorization'
}

// Call api search
export async function search(value, isUrl=false) {
	const responseSearch = await fetch(
		`${apiUrl}/api/search`,
		{
			method: 'POST',
			mode: 'cors',
			headers,
			body: JSON.stringify({val: value, isUrl: isUrl})
		}
	);
	return await responseSearch.json() // Extracting data as a JSON Object from the response
}

// Call api download
export async function download(url) {
	console.log(url)
	const responseDownload = await fetch(
		`${apiUrl}/api/downloadUrl`,
		{
			method: 'POST',
			mode: 'cors',
			headers,
			body: JSON.stringify(url)
		}
	);
	return await responseDownload.json() // Extracting data as a JSON Object from the response
}

// Call api spleet
export async function spleeter(id, title) {
	// https://stackoverflow.com/questions/68230294/how-can-i-play-audio-file-sent-from-flask-send-file
	const responseSpleeter = await fetch(
		`${apiUrl}/api/spleet`,
		{
			method: 'POST',
			mode: 'cors',
			headers,
			body: JSON.stringify({id: id, title: title}),
			responseType: 'blob',
		}
	);
	return await responseSpleeter.blob()
}