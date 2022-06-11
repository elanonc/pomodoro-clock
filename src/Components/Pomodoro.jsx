import React, { useState, useEffect } from 'react';
import TempoDaSessao from './TempoDaSessao';
import "./Pomodoro.css"


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
      setTempo(tempo - 1);
    }
  }, 1000);

  const clock = () => {
    if(tempoPomodoro){
      timeout;
      resetTimer();
    }else {
      clearTimeout(timeout);
    }
  }

  useEffect(() => {
    clock();
  }, [tempoPomodoro, tempo, timeout])

  const resetTimer = () => {
    const audio = document.getElementById("alarme");
    if(!tempo && tipoDeSessao === "trabalho"){
      setTempo(tempoDePausa);
      setTipoDeSessao("pausa");
      audio.play();
    }
    if(!tempo && tipoDeSessao === "pausa"){
      setTempo(tempoDeTrabalho);
      setTipoDeSessao("trabalho");
      audio.pause();
      audio.currentTime = 0;
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
    const audio = document.getElementById("alarme");
    audio.pause();
    audio.currentTime = 0;
  }

  return (
    <div>
      <h1> <strong>Pomodoro App</strong></h1>
        <div className="container-clock">
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
        </div>
        <div className="clock">
          <h2 id="pomodoro text-center"> {formatoRelogio(tempo)} </h2>
          <button className="btn btn-lg btn-secondary" onClick={handlePlay}>
            { tempoPomodoro ? 
              <i className="material-icons">pause_circle_filled</i>
               :
              <i className="material-icons">play_circle_filled</i>
            } 
          </button>
          <button className="btn btn-secondary btn-lg" onClick={resetaRelogio}>
            <i className="material-icons">autorenew</i>
          </button>
        </div>
    </div>
  )
}

export default Pomodoro;