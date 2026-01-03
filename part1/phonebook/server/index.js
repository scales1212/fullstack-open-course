const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

// custom log string
morgan.token('data', function (request, response) {
  if (request.method === "POST") {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

/**
 * Helper function to return random id
 * @returns random ID
 */
const getRandomID = () => {
  return String(Math.floor(Math.random() * 1000))
}

/**
 * Get INFO data
 */
app.get('/info', (request, response) => {
  const len = persons.length

  const reqTime = new Date()
  const parts = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/New_York"
  }).formatToParts(reqTime);

  const get = type => parts.find(p => p.type === type)?.value;

  const str = `${get("weekday")} ${get("month")} ${get("day")} ${get("hour")}:${get("minute")} eastern time`
  response.send(`<div>Number of entries in Phonebook: ${len}</div><div>${str}</div>`)
})

/**
 * Get individual resource based on id
 */
app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).end()
  }
})

/**
 * Add individual resource
 */
app.post('/api/persons', (request, response) => {
  const person = request.body

  if (!person.name) {
    return response.status(400).json({
      error: 'no name'
    })
  }

  if (!person.number) {
    return response.status(400).json({
      error: 'no number'
    })
  }

  const names = persons.map(person => person.name)
  if (names.includes(person.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  person.id = getRandomID()
  persons = persons.concat(person)
  response.json(person)
})

/**
 * Delete single resouce by id
 */
app.delete('/api/persons/:id', (request, response) => {
  const person = persons.find(p => p.id === request.params.id)

  if (person) {
    persons = persons.filter(p => p.id !== person.id)
    response.status(204).end()
  }
  else {
    response.status(404).end()
  }
})

/**
 * Get total persons list in JSON
 */
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})