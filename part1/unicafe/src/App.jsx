import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
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

const StatisticLine = (props) => {
  return (
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
  )
}

const Statistics = (props) => {
  const goodSum = props.good;
  const badSum = props.bad * -1;
  const all = props.good + props.bad + props.neutral;
  const avgValue = (goodSum + badSum)/all;

  if (all == 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={avgValue}/>
          <StatisticLine text="positive" value={(props.good/all)*100 + '%'}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const header1 = "give feedback"
  const header2 = "statistics"

  return (
    <div>
      <Header name={header1}/>
      <div style={{display: 'flex', gap: '5px'}}>
        <Button category="good" onClick={()=>{setGood(good+1)}}/>
        <Button category="neutral" onClick={()=>{setNeutral(neutral+1)}}/>
        <Button category="bad" onClick={()=>{setBad(bad+1)}}/>
      </div>
      <Header name={header2}/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App