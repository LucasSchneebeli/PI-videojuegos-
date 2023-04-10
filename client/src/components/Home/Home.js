import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Juegos from '../Juegos/Juegos'


export default function Home() {
  const [juego, setJuego] = useState('')
  const [info, setInfo] = useState([])

  const handleChange = (e) => {
    setJuego(e.target.value)
  }

  useEffect(() => {
    getInformacion()
  }, [])


  const getInformacion = () => {
    axios.get(`http://localhost:3001/videogames`)
      .then(res => res.data)
      .then(res => {
        setInfo(res)
        console.log(res)
      })
    }

  return (
    <div>
      <input type='text' placeholder='buscar juego' value={juego} onChange={handleChange}></input>
      <button>Buscar</button>
      <section>
      <Juegos info = {info}/>
      </section>
    </div>

  )
}