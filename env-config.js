const fs = require('fs')
const dotenv = require('dotenv')

const envConfig = dotenv.parse(fs.readFileSync('.env'))

for (const key in envConfig) {
	if (key.startsWith('NEXT_PUBLIC_')) {
		process.env[key] = envConfig[key]
	}
}
