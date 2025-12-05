import { useState } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import AddName from './components/AddName'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '212-505-1234'
    },
    {
      name: 'Carlos Santee',
      number: '505-123-4567'
    },
    {
      name: 'Winston Smith',
      number: '012-555-0894'
    },
    {
      name: 'Greg Pikitus',
      number: '609-987-5555'
    },
    {
      name: 'Warwick Handle',
      number: '505-498-6666'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      window.alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
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
      <Filter searchName={searchName} handleSearch={handleSearch}/>
      <AddName addName={addName} newName={newName} handlePersonChange={handlePersonChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <div>
        {dispPersons.map(person =>
          <Person key={person.name} person={person}/>
        )}
      </div>
    </div>
  )
}

export default App