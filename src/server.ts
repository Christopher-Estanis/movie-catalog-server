import { SERVER_PORT } from './infra/environments/ServerEnvironment'
import { ExpressAdapterImp } from './main/adapters/ExpressAdapter'
import { CreateDefaultUserProcedure } from './main/procedures/CreateDefaultUserProcedure'
import AuthenticationRoutes from './main/routes/AuthenticationRoutes'
import MovieRoutes from './main/routes/MovieRoutes'

ExpressAdapterImp.setupEncoders()
ExpressAdapterImp.setupRoutes(AuthenticationRoutes)
ExpressAdapterImp.setupRoutes(MovieRoutes)

void ExpressAdapterImp.startServer(SERVER_PORT)

// @ TODO Create procedure class
setTimeout(() => {
  void CreateDefaultUserProcedure()
}, 5000)
