export const initRoutes = server => {
  server.route({
    method: 'POST',
    path:'/tennis/book',
    handler: (request, reply) => {
      return reply('youpi')
    }
  })

  server.route({
    method: 'GET',
    path:'/tennis/results',
    handler: (request, reply) => {
      return reply('the current results are')
    }
  })
}
