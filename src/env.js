/**
 * @type {import("zod")}
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const z = require('zod')

const envSchema = z.object({
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXT_AUTH_SECRET: z.string(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  console.error(
    '❌ Missing or invalid environment variables detected',
    parsed.error.format(),
  )
  process.exit(1)
}

module.exports = { env: parsed.data }
