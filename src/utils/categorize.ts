'use server'

import {env} from '~/env.mjs'

export default async function categorize(file: string, labels: string[]) {
	const res = await fetch(
		'https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32',
		{
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + env.HUGGING_FACE_API_KEY
			},
			body: JSON.stringify({
				parameters: {
					candidate_labels: labels
				},
				inputs: file
			})
		}
	)

	return res.json() as Promise<{score: string; label: string}[]>
}
