require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('dist'))

// custom log string
morgan.token('data', function (request, response) {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))

/**
 * Get INFO data
 */
app.get('/info', (request, response) => {
  const personsCount = Person.countDocuments()
  console.log(personsCount)
  const reqTime = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/New_York'
  }).formatToParts(reqTime)

  const get = type => parts.find(p => p.type === type)?.value

  const str = `${get('weekday')} ${get('month')} ${get('day')} ${get('hour')}:${get('minute')} eastern time`
  response.send(`<div>Number of entries in Phonebook: ${personsCount}</div><div>${str}</div>`)
})

/**
 * Get individual resource based on id
 */
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

/**
 * Add individual resource
 */
app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({
      error: 'no name'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'no number'
    })
  }

  const exists = await Person.exists({name: body.name})
  if (exists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

/**
 * Delete single resouce by id
 */
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(person => {
      if (person) {
        response.status(204).end()
      }
      else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
}
)

/**
 * Update entry by id
 */
app.put('/api/persons/:id', (request, response, next) => {
  const newNumber = request.body.number
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }

      person.number = newNumber

      return person.save().then(updatedContact => {
        response.json(updatedContact)
      })
    })
    .catch(error => next(error))
})

/**
 * Get total persons list in JSON
 */
app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name == 'CastError') {
    return response.status(400).send({error: 'Malformed ID'})
  }
  else if (error.name == 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
})