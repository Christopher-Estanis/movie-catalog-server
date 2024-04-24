import { STATUS_CODES } from 'http'

import { SERVER_PORT } from './infra/environments/ServerEnvironment'
import ConsoleAdapter from './main/adapters/ConsoleAdapter'
import ExpressAdapter from './main/adapters/ExpressAdapter'
import AuthenticationRoutes from './main/routes/AuthenticationRoutes'

ExpressAdapter.setupRoutes(AuthenticationRoutes)

// const a = new HttpResponseAbstract('foi')

ConsoleAdapter.error(STATUS_CODES.OK)

void ExpressAdapter.startServer(SERVER_PORT)
