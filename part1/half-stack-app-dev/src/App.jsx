const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        {props.parts[0].part} {props.parts[0].size}
      </p>
      <p>
        {props.parts[1].part} {props.parts[1].size}
      </p>
      <p>
        {props.parts[2].part} {props.parts[2].size}
      </p>
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.parts[0].size + props.parts[1].size + props.parts[2].size}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part: 'Fundamentals of React', size: 10},
    {part:'Using props to pass data', size: 7},
    {part: 'State of a component', size: 14}
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App