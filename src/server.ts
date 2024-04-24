import ExpressAdapter from './infra/adapter/ExpressAdapter'
import { SERVER_PORT } from './infra/config/ServerConfig'
import AuthenticationRoutes from './infra/routes/AuthenticationRoutes'

ExpressAdapter.setupRoutes(AuthenticationRoutes)

void ExpressAdapter.startServer(SERVER_PORT)
