'use client'

import {useState} from 'react'
import categorize from '~/utils/categorize'
import toBase64 from '~/utils/toBase64'

export default function Page() {
	const [labels, setLabels] = useState<string[]>([''])
	const [categories, setCategories] = useState<{score: string; label: string}[]>(
		[]
	)

	function handleUpload(files: FileList | null) {
		;(async () => {
			const file = files[0]
			const base64 = await toBase64(file)
			const categories = await categorize(base64, labels)
			console.log(categories)
			setCategories(categories)
		})()
	}

	return (
		<>
			<h1>Set labels</h1>
			{labels.map((label, index) => (
				<input
					key={index}
					value={label}
					onChange={e => {
						const newLabels = [...labels]
						newLabels[index] = e.target.value
						setLabels(newLabels)
					}}
				/>
			))}
			<button onClick={() => setLabels([...labels, ''])}>+</button>

			<h1>Upload File</h1>
			<input
				type='file'
				accept='image/*'
				onChange={e => handleUpload(e.target.files)}
			/>

			<h1>Results</h1>
			<ul>
				{categories.map(({score, label}) => (
					<li key={label}>
						{label} - {score}
					</li>
				))}
			</ul>
		</>
	)
}
