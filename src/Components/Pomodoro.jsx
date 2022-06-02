import React, { useState } from 'react';
import TempoDaSessao from './TempoDaSessao';
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp';
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';

function Pomodoro() {

  const [tempo, setTempo] = useState(25*60);
  const [tempoDePausa, setTempoDePausa] = useState(5*60);
  const [tempoDeTrabalho, setTempoDeTrabalho] = useState(25*60);
  const [tempoPomodoro, setTempoPomodoro] = useState(false);

  const formatoRelogio = (time) => {
    let minutes = Math.floor(time/60); 
    let seconds = time % 60;
    return ( 
      (minutes < 10 ? "0" + minutes:minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds) 
    )
  }

  const aumentaOuDiminuiTempo = (amount, type) => {
    if (type === "pausa") {
      if (tempoDePausa <= 60 && amount < 0) {
        return;
      }
      setTempoDePausa((prev) => prev + amount);
    } else {
      if (tempoDeTrabalho <= 60 && amount < 0) {
        return;
      }
      setTempoDeTrabalho((prev) => prev + amount);
      if(!tempoPomodoro){
        setTempo(tempoDeTrabalho + amount);
      }
    }
  }

  const controlaRelogio = () => {

  }

  const resetaRelogio = () => {
    setTempo(25*60);
    setTempoDePausa(5*60);
    setTempoDeTrabalho(25*60);
  }

  return (
    <div>
        <h1>POMODORO</h1>
        <TempoDaSessao
          title={"Tempo de Pausa"}
          type={"pausa"}
          time={tempoDePausa}
          aumentaOuDiminuiTempo={aumentaOuDiminuiTempo} 
          formatoRelogio={formatoRelogio}
        />
        <TempoDaSessao
          title={"Tempo de Trabalho"}
          type={"trabalho"}
          time={tempoDeTrabalho}
          aumentaOuDiminuiTempo={aumentaOuDiminuiTempo} 
          formatoRelogio={formatoRelogio}
        />
        <h2> {formatoRelogio(tempo)} </h2>
        <button onClick={controlaRelogio}>
          { tempoPomodoro ? (
              <PauseCircleFilledSharpIcon color="primary"/>
            ) : (
              <PlayCircleFilledSharpIcon color="primary"/>
            ) 
          } 
        </button>
        <button onClick={resetaRelogio}>
          <i className="material-icons">autorenew</i>
        </button>
    </div>
  )
}

export default Pomodoro;