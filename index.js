const express = require('express')
const cors = require('cors')

const logger = require('./loggerMiddleware')
const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que comprar una moto',
    date: '2020-05-30T19:20:12.000Z',
    important: true
  },
  {
    id: 2,
    content: 'Tengo que preparar las cosas del viaje',
    date: '2020-05-30T19:20:12.000Z',
    important: true
  },
  {
    id: 3,
    content: 'No te olvides de la fermentación del pan',
    date: '2020-05-30T19:20:12.000Z',
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello Wolrd</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(`Note with id ${id} requested`)

  const note = notes.find((note) => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)

  console.log(`Note with id ${id} deleted`)

  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map((note) => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]

  res.json(newNote)
})

app.use((req, res) => {
  res.status(404).json({
    error: 'Not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port http://localhost:${PORT}`)
})
