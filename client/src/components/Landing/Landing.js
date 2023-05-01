import React from 'react'
import { Link } from 'react-router-dom'
import s from './Landing.module.css'

export default function Landing() {
  return (
    <div>
      <div className={s.container}>
        <h1 className={s.h1}>Bienvenido a la mejor pagina de videojuegos online</h1>

        
        <Link to='/home'>
          <button className={s.boton}> INGRESAR </button>
        </Link>

      </div>
    </div>
  )
}
