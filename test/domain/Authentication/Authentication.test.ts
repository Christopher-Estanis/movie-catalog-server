import bcrypt from 'bcrypt'

import { Authentication } from '../../../src/domain/Authentication/Authentication'

describe('Authentication Entity', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should generate a new id before insertion if id is not provided', () => {
    const auth = new Authentication()
    expect(auth.id).toBeUndefined()

    auth.generateId()

    expect(auth.id).toBeDefined()
  })

  it('should hash password before insertion', async () => {
    const auth = new Authentication()
    auth.password = 'password123'

    const bcryptHashSpy = jest.spyOn(bcrypt, 'hash') as jest.Mock
    bcryptHashSpy.mockResolvedValue('hashedPassword')

    await auth.hashPassword()

    expect(bcryptHashSpy).toHaveBeenCalledWith('password123', 10)
    expect(auth.password).toBe('hashedPassword')
  })

  it('should compare password with hashed password', async () => {
    const auth = new Authentication()
    auth.password = 'password123'

    const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare') as jest.Mock
    bcryptCompareSpy.mockResolvedValue(true)

    const isValid = await auth.isValidPassword('password123')

    expect(bcryptCompareSpy).toHaveBeenCalledWith('password123', auth.password)
    expect(isValid).toBe(true)
  })
})
