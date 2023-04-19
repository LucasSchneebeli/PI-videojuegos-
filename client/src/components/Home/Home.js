import React from 'react'
import {useEffect } from 'react'
import axios from 'axios'
import Juegos from '../Juegos/Juegos'
import { TomarJuegos } from '../../redux/actions'
import BarraDeBusqueda from '../Barra-de-busqueda/BarraDeBusqueda'
import BusquedaDeJuego from '../BusquedaDeJuegos/BusquedaDeJuego'
import { useDispatch } from 'react-redux';
import CreacionDeJuego from '../Creacion-De-Juego/CreacionDeJuego';
import styles from './Home.module.css'





export default function Home() {

  const dispatch = useDispatch();

  useEffect(() => {
    getInformacion()
  }, [])

  const getInformacion = () => {
    axios.get(`http://localhost:3001/videogames`)
      .then(res => res.data)
      .then(res => {
        dispatch(TomarJuegos(res))
        
      })
  }

  return (
    <div className={styles.homeContainer}>
      

      

      <div>
        <CreacionDeJuego/>
        <BarraDeBusqueda/>
        <BusquedaDeJuego/>
        <Juegos />
      </div>


    </div>

  )
}