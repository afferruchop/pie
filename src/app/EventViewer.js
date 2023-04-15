import React, { Component } from "react";
import moment from 'moment';
import './EventViewer.css';

class EventViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
    this.logEvent = this.logEvent.bind(this);
    this.getEvent = this.getEvent.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.recargarPagina = this.recargarPagina.bind(this);
  }

  getEvent() {
    const now = moment().format('DD/MM/YYYY HH:mm:ss');
    const newEvent = `${now} - ${"Eventos Obtenidos"}`;

    fetch('/api/eventos', {
      method: 'GET',      
    })
      .then(res => res.json())
      .then(data => {        
        this.setState(prevState => ({
          events: [...prevState.events, newEvent, ...data.result.map(item => JSON.stringify(item))]
        }));
      })
      .catch(err => console.log(err));
  }

  logEvent(message) {

    const now = moment().format('DD/MM/YYYY HH:mm:ss');
    const newEvent = `${now} - ${message}`;
    this.setState(prevState => ({
      events: [...prevState.events, newEvent]
    }));
  }

  addEvent(e) {
    
    var newEvent = document.getElementById("new_event").value;
    var sendEvent = newEvent;
    newEvent != '' ? this.logEvent('Nuevo evento' + newEvent) : this.logEvent('Nuevo evento');
    
    console.log("Agregando evento" + sendEvent);
    
    /*if(sendEvent != '')
    {
      fetch('/api/eventos', {
        method: 'POST',
        body: sendEvent,
        headers: {
          'Accept' : 'aplication/json',
          'Content-Type' : 'application/json'
        }
      })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }*/

    e.preventDefault();
  }

  recargarPagina() {
      window.location.reload();
  };

  render() {
    return (
      <div className="container">
        <div style={{ textAlign: 'center' }} className="row">
          <h1>Visor de Eventos Proyecto PIE</h1>
        </div>
        <div className="row">
          <div className="card">
            <div className="card-conten">
              <form className="col s12" onSubmit={this.addEvent}>
                <div className="row">
                  <div className="input-field">
                    <input name="evento" placeholder="Separar eventos con" id="new_event" type="text" onChange={this.handleChange} className="validate"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col s3">
                    <button className="waves-effect waves-light btn" type="submit">Separar eventos</button>
                  </div>
                  <div className="col s3">
                    <button className="waves-effect waves-light btn blue" onClick={this.getEvent}>Obtener eventos</button>
                  </div>
                  <div className="col s6">
                    <button className="waves-effect waves-light btn orange" onClick={this.recargarPagina}>Limpiar eventos mostrados</button>
                  </div>
                </div>
              </form>
            </div>
          </div> 
        </div>
        <div className="event-viewer row">
          <ul>
            {this.state.events.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default EventViewer;