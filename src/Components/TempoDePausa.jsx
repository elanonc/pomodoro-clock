import React from 'react';
import ArrowDownwardSharpIcon from '@mui/icons-material/ArrowDownwardSharp';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import "./TempoDePausa.css"

function TempoDePausa (props) {

  return (
    <div className="container">
      <h3> Tempo de Pausa </h3>
      <div className="time-sets">  
        <button onClick={() => props.aumentaOuDiminuiPausa(-60)}>
            <ArrowDownwardSharpIcon color="primary"/>
        </button>
        <h3>{props.formatoRelogio(props.time)}</h3>
        <button onClick={() => props.aumentaOuDiminuiPausa(60)}>
            <ArrowUpwardSharpIcon color="primary"/>
        </button>
      </div>
    </div>
  )
}

export default TempoDePausa;