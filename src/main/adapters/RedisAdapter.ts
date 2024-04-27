import * as redis from 'redis'

export class RedisAdapter {
  redisClient: redis.RedisClientType

  constructor () {
    this.redisClient = redis.createClient()
  }

  async get <t> (arg: string) {
    try {
      const data = await this.redisClient.get(arg)

      if (!data) return null

      return JSON.parse(data) as t
    } catch (error) {
      return null
    }
  }

  async setSeconds (arg: string, data: object, seconds: number) {
    await this.redisClient.set(arg, JSON.stringify(data), { EX: seconds })
  }
}

export const RedisAdapterImp = new RedisAdapter()
