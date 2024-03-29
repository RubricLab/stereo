'use server'

import {env} from '~/env.mjs'

export const upload = async ({file}: {file: File}) => {
	const name = encodeURIComponent(file.name)
	const bucket = 'images-stereo'
	const url = `https://storage.googleapis.com/upload/storage/v1/b/${bucket}/o?uploadType=media&name=${name}`

	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/octet-stream',
			Authorization: `Bearer ${env.GCP_KEY}`
		},
		body: file
	})

	const json = await res.json()
	console.log(json)

	if (!res.ok) {
		console.log(`\n\n\x1b[33m→ HERE \x1b[0m\n`)
		console.log(res.status, res.statusText)

		throw new Error('upload failed')
	}

	const gsUri = `gs://${bucket}/${name}`

	return gsUri
}
