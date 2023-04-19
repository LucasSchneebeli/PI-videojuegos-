import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Juego from '../Juego/Juego'




export default function BarraDeBusqueda() {
const [juego, setJuego] = useState('')
const [resultado, setResultado] = useState([]);

const handleChange = (e) => {
  setJuego(e.target.value)
}


  const handleResultado = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/videogames?name=${juego}`)
      setResultado(res.data)
    } catch (error) {
      console.log(error)
    } 
  }


  return (
    <div>
        <input type='text' placeholder='Buscar juego' value={juego} onChange={handleChange}></input>
        <button onClick={handleResultado}>Buscar</button>
        {resultado && resultado.map(j => 
          <Juego 
          key={j.id}
          nombre={j.nombre}
          imagen={j.imagen}
          generos={j.generos}
          />)}
       
      </div>

  )
}
