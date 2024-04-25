import { mock, MockProxy } from 'jest-mock-extended'
import { Repository } from 'typeorm'

import { Authentication } from '../../../src/domain/Authentication/Authentication'
import { SigninDTO } from '../../../src/domain/Authentication/AuthenticationDTOs'
import { SigninUnauthorizedError } from '../../../src/domain/Authentication/AuthenticationErrors'
import { AuthenticationService } from '../../../src/domain/Authentication/AuthenticationService'
import JsonWebTokenAdapter from '../../../src/main/adapters/JsonWebTokenAdapter'

const authenticationMock = {
  id: 'any_id',
  email: 'test@email.com',
  password: 'Umdoistresquatro3@',
  encryptedPassword: '$2b$10$Wq3s2uaAqrVwCuAjnSK.ueYA4.ZR8xubTPJwv8NuTYyv8n64D/gBG',
  token: 'token_test'
}

describe('Signin', () => {
  let authenticationRepository: MockProxy<Repository<Authentication>>
  let jsonWebTokenAdapter: MockProxy<JsonWebTokenAdapter>
  let authenticationService: AuthenticationService

  beforeEach(() => {
    authenticationRepository = mock<Repository<Authentication>>()
    jsonWebTokenAdapter = mock<JsonWebTokenAdapter>()
    authenticationService = new AuthenticationService(authenticationRepository, jsonWebTokenAdapter)
  })

  it('should call authenticationRepository with correct params', async () => {
    const authentication = new Authentication(authenticationMock.id, authenticationMock.email, authenticationMock.encryptedPassword)
    authenticationRepository.findOneBy.mockResolvedValueOnce(authentication)

    const signinDTO: SigninDTO = { email: authenticationMock.email, password: authenticationMock.password }
    await authenticationService.signin(signinDTO)

    expect(authenticationRepository.findOneBy).toHaveBeenCalledWith({ email: authenticationMock.email })
    expect(authenticationRepository.findOneBy).toHaveBeenCalledTimes(1)
  })

  it('should call jsonWebTokenAdapter with correct params', async () => {
    const authentication = new Authentication(authenticationMock.id, authenticationMock.email, authenticationMock.encryptedPassword)
    authenticationRepository.findOneBy.mockResolvedValueOnce(authentication)

    const signinDTO: SigninDTO = { email: authenticationMock.email, password: authenticationMock.password }
    await authenticationService.signin(signinDTO)

    expect(jsonWebTokenAdapter.sign).toHaveBeenCalledWith({ userId: authentication.id })
    expect(jsonWebTokenAdapter.sign).toHaveBeenCalledTimes(1)
  })

  it('should throw SigninUnauthorizedError if authentication fails', async () => {
    authenticationRepository.findOneBy.mockResolvedValueOnce(null)

    const signinDTO: SigninDTO = { email: authenticationMock.email, password: 'invalid_password' }
    await expect(authenticationService.signin(signinDTO)).rejects.toThrow(SigninUnauthorizedError)
  })

  it('should return an object with token if authentication succeeds', async () => {
    const authentication = new Authentication(authenticationMock.id, authenticationMock.email, authenticationMock.encryptedPassword)
    authenticationRepository.findOneBy.mockResolvedValueOnce(authentication)
    jsonWebTokenAdapter.sign.mockReturnValueOnce(authenticationMock.token)

    const signinDTO: SigninDTO = { email: authenticationMock.email, password: authenticationMock.password }
    const result = await authenticationService.signin(signinDTO)

    expect(result).toEqual({ token: authenticationMock.token })
  })

  it('should handle authenticationRepository errors', async () => {
    authenticationRepository.findOneBy.mockRejectedValueOnce(new Error('Database error'))

    const signinDTO: SigninDTO = { email: authenticationMock.email, password: authenticationMock.password }
    await expect(authenticationService.signin(signinDTO)).rejects.toThrow(Error)
  })
})
