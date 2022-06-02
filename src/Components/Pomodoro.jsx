import React, { useState } from 'react';
import TempoDePausa from './TempoDePausa';

function Pomodoro() {

  const [tempo, setTempo] = useState(25*60);
  const [pausa, setPausa] = useState(5*60);

  const formatoRelogio = (time) => {
    let minutes = Math.floor(time/60); 
    let seconds = time % 60;
    return ( 
      (minutes < 10 ? "0" + minutes:minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) 
    )
  }

  const aumentaOuDiminuiPausa = (amount) => {
    setPausa(prev => prev + amount);
  } // fazer tratamento de erro do tempo negativo

  return (
    <div>
        <h1> 
          {formatoRelogio(tempo)}
        </h1>
        <TempoDePausa
          time={pausa}
          aumentaOuDiminuiPausa={aumentaOuDiminuiPausa} 
          formatoRelogio={formatoRelogio}
        />
    </div>
  )
}

export default Pomodoro;