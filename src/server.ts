import { SERVER_PORT } from './infra/environments/ServerEnvironment'
import ExpressAdapter from './main/adapters/ExpressAdapter'
import { CreateDefaultUserProcedure } from './main/procedures/CreateDefaultUserProcedure'
import AuthenticationRoutes from './main/routes/AuthenticationRoutes'
import MovieRoutes from './main/routes/MovieRoutes'

ExpressAdapter.setupEncoders()
ExpressAdapter.setupRoutes(AuthenticationRoutes)
ExpressAdapter.setupRoutes(MovieRoutes)

void ExpressAdapter.startServer(SERVER_PORT)

// @ TODO Create procedure class
setTimeout(() => {
  void CreateDefaultUserProcedure()
}, 5000)
