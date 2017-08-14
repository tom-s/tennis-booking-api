export const initRoutes = server => {
  server.route({
    method: 'POST',
    path:'/tennis/book',
    handler: (request, reply) => {
      const { date, time, court } = request
      const endTime = ''
      const booking = {
        dateObj: extractDate(date),
        startTime:  pad(parseInt(time)),
        endTime: pad(parseInt(time) + 1),
        court: parseInt(court)
      }

      book(booking, (data) => {
        return reply('booking in progress')
      })
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
