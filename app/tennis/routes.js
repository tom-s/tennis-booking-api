import { book } from './services/scheduler'

/*
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
     "extractedData":"Wed Aug 16 2017 17:00:00 GMT+0200 (RDT)"
  },
  {
     "id":1045306,
     "raw":"2",
     "extractedData":"2"
  }
]*/

const extractData = history => history.reduce((memo, reply) => {
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
    handler: {
      async async({ payload }, reply) {
        try {
          console.log("payload", payload)
          const { replyHistory } = payload
          const [ dateStr, court ] = extractData(JSON.parse(replyHistory))
          const date = new Date(dateStr)

          const booking = {
            date,
            court: parseInt(court)
          }

          book(booking, (data) => {
            return reply('booking in progress', data)
          })
        } catch(e) {
          return reply('error').code(500)
        }
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
