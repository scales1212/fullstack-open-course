const Person = ({person}) => {
  return (
    <div>
      <ul>{person.name} : {person.number}</ul>
    </div>
  )
}

export default Person