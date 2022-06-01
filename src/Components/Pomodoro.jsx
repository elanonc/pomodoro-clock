import React, { useState } from 'react';

function Pomodoro() {

  const [tempo, setTempo] = useState(25*60);

  const formatoRelogio = (time) => {
    let minutes = Math.floor(time/60); 
    let seconds = time % 60;
    return ( 
      (minutes < 10 ? "0" + minutes:minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) 
    )
  }

  return (
    <div>
        <h1> 
          {formatoRelogio(tempo)}
        </h1>
    </div>
  )
}

export default Pomodoro;