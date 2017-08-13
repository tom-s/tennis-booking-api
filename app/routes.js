export const initRoutes = server => {

  server.route({
    method: 'GET',
    path:'/hello',
    handler: (request, reply) => {
      return reply('hello world !!!')
    }
  })

  server.route({
    method: 'GET',
    path:'/youpi',
    handler: (request, reply) => {
      return reply('youpi')
    }
  })
}