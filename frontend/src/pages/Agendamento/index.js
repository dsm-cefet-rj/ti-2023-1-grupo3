import React, { useState } from 'react'

function Agendamento() {

  const [local, setLocal] = useState("");
  const [horario, setHorario] = useState("")


  const handleSubmit = () => { 
    console.log(local)
    console.log(horario)
    window.alert(`Sua consulta foi marcada!.`)
  }

  return (
    <>
      <h1>Agendamento</h1>

      <section>
        <div>
          <label htmlFor="local">Local: </label>
          <select
          placeholder='Selecione o Especialista'
            value={local} 
            onChange={({ target }) => setLocal(target.value)} name="horario" id="horario">
            <option value="" disabled>Selecione o Local</option>
            <option value="Local1">Local 1</option>
            <option value="Local2">Local 2</option>

          </select>
        </div>


        <div>
          <label htmlFor="horario">Horario: </label>
          <select value={horario} onChange={({ target }) => setHorario(target.value)} name="horario" id="horario">
            <option value="9">09:00</option>
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>

          </select>
        </div>

        <div>
          <button onClick={handleSubmit}>Marcar</button>
        </div>
      </section>
    </>
  )
}

export default Agendamento;