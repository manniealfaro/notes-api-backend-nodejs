const http = require('node:http')

let notes = [
  {
    id: 1,
    content: 'Me tengo que comprar una moto',
    date: '2020-05-30T19:20:12.000Z',
    important: true,
  },
  {
    id: 2,
    content: 'Tengo que preparar las cosas del viaje',
    date: '2020-05-30T19:20:12.000Z',
    important: true,
  },
  {
    id: 3,
    content: 'No te olvides de la fermentación del pan',
    date: '2020-05-30T19:20:12.000Z',
    important: true,
  },
]

const app = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(notes))
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`)
})
