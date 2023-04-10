import React from 'react'
import Juego from '../Juego/Juego'

export default function Juegos(props) {

    const {info}  = props

  
    return (
    <div>
        
        {info.map(j => 
        <Juego
        key= {j.nombre}
        nombre= {j.nombre}
        imagen= {j.imagen}
        generos= {j.generos}
       /> )}
        
        
        
        </div>
  )
}
