import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Display = (props) => {
  return (
    <div>
      <p>{props.category} {props.value}</p>
    </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}> {props.category}</button>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header1 = "give feedback"
  const header2 = "statistics"

  const goodSum = good;
  const badSum = bad * -1;
  const all = good + bad + neutral;
  const avgValue = (goodSum + badSum)/all;
  return (
    <div>
      <Header name={header1}/>
      <Button category="good" onClick={()=>{setGood(good+1)}}/>
      <Button category="neutral" onClick={()=>{setNeutral(neutral+1)}}/>
      <Button category="bad" onClick={()=>{setBad(bad+1)}}/>
      <Header name={header2}/>
      <Display category="good" value={good}/>
      <Display category="neutral" value={neutral}/>
      <Display category="bad" value={bad}/>
      <Display category="all" value={all}/>
      <Display category="average" value={avgValue}/>
      <Display category="positive" value={(good/all)*100 + '%'}/>
    </div>
  )
}

export default App