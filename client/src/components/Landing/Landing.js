import React from 'react'
import { Link } from 'react-router-dom'
import s from './Landing.module.css'

export default function Landing() {
  return (
    <div>
      <div className={s.container}>
        <h1 className={s.h1}>Bienvenido a la mejor pagina de videojuegos online</h1>

        <img className={s.imagen} src='https://www.unir.net/wp-content/uploads/2015/04/videojuegos_1920x1080.jpg' alt='Juego' />
        <Link to='/home'>
          <button className={s.boton}> INGRESAR </button>
        </Link>

      </div>
    </div>
  )
}
