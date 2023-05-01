import React from 'react'
import Juego from '../Juego/Juego'
import { useSelector } from 'react-redux'
import styles from './Juegos.module.css'
import { useState } from 'react'
import Paginado from '../Paginado/Paginado'

export default function Juegos() {

  const [paginaActual, setPaginaActual] = useState(1);

  const videojuegos = useSelector(state => state.videojuegos)
  const selectedOption = useSelector(state => state.selectedOption)
  const videojuegosGenero = useSelector(state => state.videojuegosGenero)

  console.log(videojuegosGenero)


  let videojuegosPantalla = videojuegos


  if (selectedOption === 'API') {
    videojuegosPantalla = videojuegos.filter(juego => !isNaN(juego.id))
  } else if (selectedOption === 'Base de Datos') {
    videojuegosPantalla = videojuegos.filter(juego => isNaN(juego.id))
  }

  console.log(videojuegosPantalla)

  const juegosPorPagina = 15;
  const totalJuegos = videojuegosPantalla.length;
  const juegosMostrados = videojuegosPantalla
    .filter((juego) => {
      if (videojuegosGenero === "Elegir" || videojuegosGenero === undefined) {
        return juego;
      }
      if (juego.generos) {
        return juego.generos.some((g) => g.name === videojuegosGenero);
      } else {
        return juego.genres.some((g) => g.name === videojuegosGenero);
      }
    })
    .slice(
      (paginaActual - 1) * juegosPorPagina,
      paginaActual * juegosPorPagina,
    );

  const handlePageChange = (pageNumber) => {
    setPaginaActual(pageNumber);
  };


  return (
    <div className={styles.container}>
      <div className={styles.juegosContainer}>

        {juegosMostrados.map(j => (
          <Juego
            key={j.nombre}
            id={j.id}
            nombre={j.nombre}
            imagen={j.imagen}
            generos={j?.generos}
          />))}
      </div>
      <Paginado
        totalJuegos={totalJuegos}
        juegosPorPagina={juegosPorPagina}
        paginaActual={paginaActual}
        onPageChange={handlePageChange}
      />



    </div>
  )
}
