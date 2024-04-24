import ExpressAdapter from './infra/adapters/ExpressAdapter'
import { SERVER_PORT } from './infra/environments/ServerEnvironment'
import AuthenticationRoutes from './infra/routes/AuthenticationRoutes'

ExpressAdapter.setupRoutes(AuthenticationRoutes)

void ExpressAdapter.startServer(SERVER_PORT)
