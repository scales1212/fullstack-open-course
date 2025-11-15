const Header = (props) => {
  return (
    <div>
      <h2>{props.name}</h2>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((accumulator, curPart) =>
    accumulator + curPart.exercises, 0
  )
  return (
    <div>
      <p><strong>total of {total} exercises</strong></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}/>
      <div>
        {course.parts.map(part =>
          <Part key={part.id} name={part.name} exercises={part.exercises}/>
        )}
      </div>
     <Total parts={course.parts}/>
    </div>
  )
}

export default Course