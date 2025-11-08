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
      <button onClick={props.onClick}>{props.name}</button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const desiredLength = 8;
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(desiredLength).fill(0));

  const generateRandomSelection = () => {
    const rand = Math.floor(Math.random() * anecdotes.length);
    // console.log(rand);
    setSelected(rand);
  }

  const addVote = () => {
    const copyVotes = [...votes];
    copyVotes[selected] += 1;
    setVotes(copyVotes);
  }

  return (
    <div>
      <Header name='Anecdote of the day'/>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div style={{display: 'flex', gap: '5px'}}>
        <Button name='vote' onClick={()=>{addVote()}}/>
        <Button name='next anecdote' onClick={()=>{generateRandomSelection()}}/>
      </div>

      <Header name='Anecdote with most votes'/>
      {anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  )
}

export default App