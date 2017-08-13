import { initServer } from './server'
import { initRoutes } from './routes'

// Create server
const server = initServer(server)

// Add routes
initRoutes(server)
