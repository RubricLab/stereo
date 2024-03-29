export default function toBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve((reader.result as string).split(',')[1])
		reader.onerror = reject
	}) as Promise<string>
}
