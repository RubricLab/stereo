import {HfInference} from '@huggingface/inference'
import {createClient} from '@supabase/supabase-js'
import fs from 'fs'
import {env} from '~/env.mjs'

const hf = new HfInference(env.HUGGING_FACE_API_KEY)

async function query(data) {
	const thing = await fs.promises.readFile(data.image_path)

	const base64String = thing.toString('base64')

	const res = await fetch(
		'https://api-inference.huggingface.co/models/openai/clip-vit-base-patch32',
		{
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + env.HUGGING_FACE_API_KEY
			},
			body: JSON.stringify({
				parameters: data.parameters,
				inputs: base64String
			})
		}
	)

	return res.json()
}

function run() {
	return new Promise(async (resolve, reject) => {
		query({
			image_path: 'public/1.png',
			parameters: {
				candidate_labels: ['a cat', 'a dog', 'a human']
			}
		}).then(
			data => {
				console.log(data)
				resolve(data)
			},
			err => {
				console.error(err)
				reject(err)
			}
		)
	})
}

run()

export default function Page() {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_API_KEY)

	return 'hi'
}
