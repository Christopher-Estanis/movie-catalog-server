import * as redis from 'redis'

export class RedisAdapter {
  redisClient: redis.RedisClientType

  constructor () {
    this.redisClient = redis.createClient({
      url: 'redis://localhost:6379'
    })
    void this.redisClient.connect()
  }

  async get <t> (arg: string) {
    const data = await this.redisClient.get(arg)

    if (!data) return null

    return JSON.parse(data) as t
  }

  async setSeconds (arg: string, data: object, seconds: number) {
    await this.redisClient.set(arg, JSON.stringify(data), { EX: seconds })
  }
}

export const RedisAdapterImp = new RedisAdapter()
