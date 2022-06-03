import React, { useState, useEffect } from 'react';
import TempoDaSessao from './TempoDaSessao';
import PauseCircleFilledSharpIcon from '@mui/icons-material/PauseCircleFilledSharp';
import PlayCircleFilledSharpIcon from '@mui/icons-material/PlayCircleFilledSharp';

function Pomodoro() {

  const [tempo, setTempo] = useState(25*60);
  const [tempoDePausa, setTempoDePausa] = useState(5*60);
  const [tempoDeTrabalho, setTempoDeTrabalho] = useState(25*60);
  const [tempoPomodoro, setTempoPomodoro] = useState(false);
  const [tipoDeSessao, setTipoDeSessao] = useState("trabalho");

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

  // A cada 1 segundo sera subtraido 1 
  const timeout = setTimeout(() => {
    if(tempo && tempoPomodoro){
      setTempo(tempo - 1)
    }
  }, 1000);

  const clock = () => {
    if(tempoPomodoro){
      timeout
      resetTimer()
    }else {
      clearTimeout(timeout)
    }
  }

  useEffect(() => {
    clock()
  }, [tempoPomodoro, tempo, timeout])

  const resetTimer = () => {
    if(!tempo && tipoDeSessao === "trabalho"){
      setTempo(tempoDePausa)
      setTipoDeSessao("pausa")
      //audio.play()
    }
    if(!tempo && tipoDeSessao === "pausa"){
      setTempo(tempoDeTrabalho)
      setTipoDeSessao("trabalho")
      //audio.pause()
     // audio.currentTime = 0;
    }
  } 

  const handlePlay = () => {
    clearTimeout(timeout); // limpa o timeout encapsulado anteriormente
    setTempoPomodoro(!tempoPomodoro); // e atualiza as mudanças
  }

  const resetaRelogio = () => {
    clearTimeout(timeout);
    setTempo(25*60);
    setTempoDePausa(5*60);
    setTempoDeTrabalho(25*60);
    setTipoDeSessao("trabalho");
    setTempoPomodoro(false);
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
        <button onClick={handlePlay}>
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