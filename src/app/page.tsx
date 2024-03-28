'use client'
import {createClient} from '@supabase/supabase-js'
import {env} from '~/env.mjs'

export default function Page() {
	// Create a single supabase client for interacting with your database
	const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_API_KEY)

	return (
		<div className='flex h-screen w-full flex-col justify-center gap-10 p-5 sm:p-20'>
			<h1>Welcome</h1>
		</div>
	)
}
