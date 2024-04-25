import { SERVER_PORT } from './infra/environments/ServerEnvironment'
import ExpressAdapter from './main/adapters/ExpressAdapter'
import AuthenticationRoutes from './main/routes/AuthenticationRoutes'

ExpressAdapter.setupRoutes(AuthenticationRoutes)

void ExpressAdapter.startServer(SERVER_PORT)
