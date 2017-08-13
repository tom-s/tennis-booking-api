import Hapi from 'hapi'
import good from 'good'

const server = new Hapi.Server()

server.connection({
  host: 'localhost',
  port: 8000
})

server.route({
  method: 'GET',
  path:'/hello',
  handler: (request, reply) => {
    return reply('hello world !!!')
  }
})


// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})