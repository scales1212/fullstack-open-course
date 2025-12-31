import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import Filter from './components/Filter'
import AddName from './components/AddName'
import Notification from './components/Notification'
import pbService from './services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect (() => {
    pbService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      const updatePerson = persons.find(person => person.name === newName)
      if (newNumber !== updatePerson.number) {
        const ok = window.confirm(`${newName} is already in the phonebook, are you sure you want to update number?`)
        if (ok) {
          const updatedPerson = {
            ...updatePerson,
            number: newNumber
          }
          pbService.update(updatePerson.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => 
              person.id !== updatePerson.id ? person : returnedPerson.data
            ))
            setNotificationMessage(
              `Updated ${updatedPerson.name}'s number to ${newNumber}`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationMessage(
              `Error ${updatedPerson.name} has been deleted in server`
            )
            setTimeout(() => {
              setNotificationMessage(null)
            }, 5000)
          })
        }
      } else {
        window.alert(`${newName} is already added to phonebook`)
      }
    } else {
      pbService.create(newPerson).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson.data))
      })
      setNotificationMessage(
        `Added ${newPerson.name} to Phonebook`
      )
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const removeName = (person) => {
    const ok = window.confirm( `Delete ${person.name}?`)
    if (ok) {
      pbService.remove(person.id)
      setPersons(persons.filter(p => p.id !== person.id))
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchName(event.target.value)
  }

  const dispPersons = searchName ?
    persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase())) :
    persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter searchName={searchName} handleSearch={handleSearch}/>
      <AddName addName={addName} newName={newName} handlePersonChange={handlePersonChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {dispPersons.map(person =>
          <Person key={person.name} person={person} removeName={removeName}/>
        )}
      </div>
    </div>
  )
}

export default App