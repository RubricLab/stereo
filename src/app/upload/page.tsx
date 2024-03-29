'use server'

import {embed} from '~/utils/embed'
import {upload} from '~/utils/upload'

export default async function Page() {
	return (
		<div>
			<h1>Upload File</h1>
			<form
				action={async (formData: FormData) => {
					'use server'
					const file = formData.get('file') as File
					const uploaded = await upload({file})

					await new Promise(r => setTimeout(r, 2000)) // TODO: wait for image upload

					const vector = await embed({gcsUri: uploaded})

					console.log(vector.predictions)
				}}>
				<input
					type='file'
					name='file'
					accept='image/*'
				/>
				<button>upload</button>
			</form>
		</div>
	)
}
