import React from 'react'

export default function Juego(props) {
    const {nombre, imagen, generos} = props 
  return (
    
    <div>
        <h1>{nombre}</h1>
        <img src={imagen} alt={nombre}/>
        <h2>{generos}</h2>
    </div>
  )
}
