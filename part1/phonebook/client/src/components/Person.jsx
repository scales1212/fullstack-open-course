const Person = ({person, removeName}) => {
  return (
    <div>
        <ul>{person.name} : {person.number} <button onClick={() => removeName(person)}>delete</button></ul>
    </div>
  )
}

export default Person