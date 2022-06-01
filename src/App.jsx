import { useState } from 'react';
import './App.css';
import Pomodoro from './Components/Pomodoro';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Pomodoro />
    </div>
  )
}

export default App
