import {createEnv} from '@t3-oss/env-nextjs'
import z from 'zod'

export const env = createEnv({
	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string().min(1),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		OPENAI_API_KEY: process.env.OPENAI_API_KEY,
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		SUPABASE_URL: process.env.SUPABASE_URL,
		SUPABASE_API_KEY: process.env.SUPABASE_API_KEY,
		HUGGING_FACE_API_KEY: process.env.HUGGING_FACE_API_KEY,
		GCP_KEY: process.env.GCP_KEY
	},

	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		OPENAI_API_KEY: z.string().min(1),
		DATABASE_URL: z.string().min(1),
		NODE_ENV: z.string(),
		SUPABASE_URL: z.string().min(1),
		SUPABASE_API_KEY: z.string().min(1),
		HUGGING_FACE_API_KEY: z.string().min(1),
		GCP_KEY: z.string().min(1)
	}
})
