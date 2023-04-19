import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Juego.module.css'


export default function Juego(props) {
    const {nombre, imagen, generos, id } = props 
  return (
    
    <div className={styles.juego}>
      <Link to={`/videogame/${id}`}>
     
        <h1>{nombre}</h1>
        <img src={imagen} alt={nombre}/>
        <h2>{generos}</h2>

        </Link>
    </div>
  )
}
