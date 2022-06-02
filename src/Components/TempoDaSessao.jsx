import React from 'react';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import "./TempoDaSessao.css"

function TempoDaSessao (props) {

  return (
    <div className="container">
      <h3> {props.title} </h3>
      <div className="time-sets">  
        <button onClick={() => props.aumentaOuDiminuiTempo(-60, props.type)}>
            <ArrowDownwardSharpIcon color="primary"/>
        </button>
        <h3>{props.formatoRelogio(props.time)}</h3>
        <button onClick={() => props.aumentaOuDiminuiTempo(60, props.type)}>
            <ArrowUpwardSharpIcon color="primary"/>
        </button>
      </div>
    </div>
  )
}

export default TempoDaSessao;