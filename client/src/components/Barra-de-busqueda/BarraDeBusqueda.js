import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import Juego from '../Juego/Juego'
import styles from './BarraDeBusqueda.module.css'
import { useNavigate } from 'react-router-dom'






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

  const navigate = useNavigate();

  const handleCrearJuego = () => {
    navigate('/videogames/create')
  };


  return (
    <div className={styles.container} >
       <div className={styles.searchContainer}>
        <input type='text' placeholder='Buscar juego' value={juego} onChange={handleChange}></input>
        <button onClick={handleResultado}>Buscar</button>
        <button onClick={handleCrearJuego}>Crear Juego</button>
        </div>
        <div className={styles.resultsContainer}>
        {resultado && resultado.map(j => 
          <Juego 
          key={j.id}
          id={j.id}
          nombre={j.nombre}
          imagen={j.imagen}
          generos={j.generos}
          />)}
       </div>
 
      </div>

  )
}
