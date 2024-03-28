'use client'
import {createClient} from '@supabase/supabase-js'

export default function Page() {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(
		'https://xyzcompany.supabase.co',
		'public-anon-key'
	)

	return (
		<div className='flex h-screen w-full flex-col justify-center gap-10 p-5 sm:p-20'>
			<h1>Welcome</h1>
		</div>
	)
}
