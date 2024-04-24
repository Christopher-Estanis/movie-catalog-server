import { EntityRepository, Repository } from 'typeorm'

import { Authentication } from './Authentication'

@EntityRepository(Authentication)
export class AuthenticationRepository extends Repository<Authentication> {
}
