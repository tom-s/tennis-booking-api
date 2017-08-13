import { initServer } from './server'
import { initTennis } from './tennis'

// Create server
const server = initServer(server)

// modules
initTennis(server)
