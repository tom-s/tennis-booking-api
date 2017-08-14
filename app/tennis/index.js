import { initRoutes } from './routes'
import { initScheduler } from './services/scheduler'

export const initTennis = server => {
  initScheduler()
  initRoutes(server)
}

