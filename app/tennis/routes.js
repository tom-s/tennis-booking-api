import { pad } from './services/utils'
import { book } from './services/scheduler'

const fakeReplyHistory = [
  {
     "id":1045378,
     "raw":"2512",
     "extractedData":null
  },
  {
     "id":1045307,
     "raw":"Book a tennis court",
     "extractedData":null
  },
  {
     "id":1045305,
     "raw":"tomorrow at 5pm",
     "extractedData":"Tue Aug 15 2017 17:00:00 GMT+0200 (RDT)"
  },
  {
     "id":1045306,
     "raw":"2",
     "extractedData":"2"
  }
]

const extractData = response => response.reduce((memo, reply) => {
  const { extractedData } = reply
  if(!extractedData) return memo
  return [
    ...memo,
    extractedData
  ]
}, [])

export const initRoutes = server => {
  server.route({
    method: 'POST',
    path:'/tennis/book',
    handler: (request, reply) => {
      try {
        console.log("request", request)
        //const { replyHistory } = request
        const [ dateObj, court ] = extractData(fakeReplyHistory)
        const date = new Date(dateObj)

        const booking = {
          date,
          //startTime: pad(date.getHours()),
          //endTime: pad(date.getHours() + 1),
          court: parseInt(court)
        }

        console.log("booking", booking)

        book(booking, (data) => {
          return reply('booking in progress', data)
        })
      } catch(e) {
        return reply('error').code(500)
      }
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
