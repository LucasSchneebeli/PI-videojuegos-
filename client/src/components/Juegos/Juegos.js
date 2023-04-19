import React from 'react'
import Juego from '../Juego/Juego'
import { useSelector } from 'react-redux'
import styles from './Juegos.module.css'

export default function Juegos() {

  
    const videojuegos = useSelector(state => state.videojuegos)
    const selectedOption = useSelector(state => state.selectedOption)

    let videojuegosPantalla = videojuegos

    if (selectedOption === 'API'){
        videojuegosPantalla = videojuegos.filter(juego => !isNaN(juego.id))
    } else if (selectedOption === 'Base de Datos'){
        videojuegosPantalla = videojuegos.filter(juego => isNaN(juego.id))
    }

  console.log(videojuegosPantalla)
  // console.log(selectedOption)

    return (
    <div className={styles.juegosContainer}>
        
        {videojuegosPantalla && videojuegosPantalla.map(j => 
        <Juego
        key= {j.nombre}
        nombre= {j.nombre}
        imagen= {j.imagen}
        generos= {j?.generos}
       /> )}
        
        
        
        </div>
  )
}
