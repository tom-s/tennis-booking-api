import Hapi from 'hapi'
import Good from 'good'

export const initServer = () => {
  const server = new Hapi.Server()

  server.connection({
    host: 'localhost',
    port: 8000
  })

  server.register({
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
              response: '*',
              log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  }, (err) => {
    if (err) {
      throw err // something bad happened loading the plugin
    }

    server.start((err) => {
      if (err) {
        throw err
      }
      server.log('info', 'Server running at: ' + server.info.uri)
    })
  })

  return server
}