import {env} from '~/env.mjs'

type Prediction = {
	predictions: {
		imageEmbedding: number[]
		textEmbedding: number[]
	}[]
}

export const embed = async ({
	gcsUri
}: {
	gcsUri: string
}): Promise<Prediction> => {
	const location = 'us-central1'
	const url = `https://${location}-aiplatform.googleapis.com/v1/projects/stereo-418721/locations/${location}/publishers/google/models/multimodalembedding@001:predict`
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${env.GCP_KEY}`
		},
		body: JSON.stringify({
			instances: [
				{
					image: {
						gcsUri
					},
					text: 'idk what goes here. what is this?'
				}
			],
			parameters: {
				dimension: 1408
			}
		})
	})

	const data = await res.json()

	return data
}

// To test:
// embed({
// 	gcsUri: 'gs://images-stereo/1.jpg'
// })
