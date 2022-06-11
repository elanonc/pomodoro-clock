import React from 'react';
import "./TempoDaSessao.css";

function TempoDaSessao (props) {

  return (
    <div className="center-align text-center">
      <div className="">  
        <h3 className="text-center"> {props.title} </h3>
        <div className="btn-clock">
          <button className="btn btn-primary btn-md" onClick={() => props.aumentaOuDiminuiTempo(-60, props.type)}>
              <i className="material-icons">arrow_downward</i>
          </button>
          <h3>{props.formatoRelogio(props.time)}</h3>
          <button className="btn btn-primary btn-md" onClick={() => props.aumentaOuDiminuiTempo(60, props.type)}>
              <i className="material-icons">arrow_upward</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TempoDaSessao;