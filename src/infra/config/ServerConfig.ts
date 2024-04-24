import dotenv from 'dotenv'

dotenv.config()

export const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000
