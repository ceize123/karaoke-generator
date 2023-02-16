import http from '../http-common'

class MusicDataService {
	// Call api search
	search(data) {
		return http.post('/api/search', data)
	}

	// Call api download
	download(url) {
		return http.post('/api/downloadURL', url)
	}

	// Call api spleet task
	generate(data) {
		return http.post('/api/addTask', data, { responseType: 'blob' })
	}

	// Call api unload
	unload(uid) {
		return http.get(`/api/unload/${uid}`)
	}
}

export default new MusicDataService()

// Call api search
// export async function callSearchAPI(value, isUrl = false) {
// 	const responseSearch = await fetch(
// 		`${apiUrl}/api/search`,
// 		{
// 			method: 'POST',
// 			mode: 'cors',
// 			headers,
// 			body: JSON.stringify({val: value, isUrl: isUrl})
// 		}
// 	)
// 	return responseSearch.json() // Extracting data as a JSON Object from the response
// }

// Call api download
// export async function callDownloadAPI(url) {
// 	console.log(apiUrl)
// 	console.log(url)
// 	const responseDownload = await fetch(
// 		`${apiUrl}/api/downloadUrl`,
// 		{
// 			method: 'POST',
// 			mode: 'cors',
// 			headers,
// 			body: JSON.stringify({url: url})
// 		}
// 	);
// 	return await responseDownload.json() // Extracting data as a JSON Object from the response
// }

// Call api spleet
// export async function callAddTaskAPI(uid, id, title) {
// 	// https://stackoverflow.com/questions/68230294/how-can-i-play-audio-file-sent-from-flask-send-file
// 	const responseSpleeter = await fetch(
// 		`${apiUrl}/api/addTask`,
// 		{
// 			method: 'POST',
// 			mode: 'cors',
// 			headers,
// 			body: JSON.stringify({uid: uid, video_id: id, video_title: title}),
// 			responseType: 'blob',
// 		}
// 	);
// 	return await responseSpleeter.blob()
// }

// export async function callUnloadAPI(uid) {
// 	const response = await fetch(
// 		`${apiUrl}/api/unload`,
// 		{
// 			method: 'POST',
// 			mode: 'cors',
// 			headers,
// 			body: JSON.stringify({ uid: uid }),
// 		}
// 	);
// 	return await response.json()
// }
