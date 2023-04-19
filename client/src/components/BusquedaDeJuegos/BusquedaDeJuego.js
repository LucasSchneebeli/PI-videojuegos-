import React from 'react'
import { useState } from 'react'
import { FilterAPIoDB, FilterOrdenNombre, FilterRating, NuevoEstado } from '../../redux/actions'
import { useDispatch } from 'react-redux';
import styles from './BusquedaDeJuego.module.css'




export default function BusquedaDeJuego() {

  const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState('');
  const [options, setOptions] = useState('');
  const [rating, setRating] = useState('');

  const handleSelect = (event) => {
    setSelectedOption(event.target.value);
    // dispatch(FilterAPIoDB(event.target.value))
    dispatch(NuevoEstado(event.target.value))
  };

  const handleOpciones = (event) => {
    setOptions(event.target.value);
    dispatch(FilterOrdenNombre(event.target.value))
  };

  const handleRating = (event) => {
    setRating(event.target.value);
    dispatch(FilterRating(event.target.value))
  };

// console.log(selectedOption, options, rating)

  return (
    <div className={styles.container}>
      <div className={styles.formGroup}>

        <h3>Buscar juego segun:</h3>

        <label htmlFor='dropdown'>API o BASE DE DATOS</label>
        <select value={selectedOption} onChange={handleSelect}>
          <option value="Elegir una opcion">--Elegir una opcion--</option>
          <option value="API">API</option>
          <option value="Base de Datos">Base de Datos</option>
          <option value='Ambos'>Ambos</option>
        </select>
      </div>

      <div>
        <label htmlFor='dropdown'>Alfabeticamente</label>
        <select value={options} onChange={handleOpciones}>
          <option value="Elgir una opcion">--Elegir una opcion--</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div>
        <label htmlFor='dropdown'>Rating</label>
        <select value={rating} onChange={handleRating}>
          <option value="">--Elegir una opcion--</option>
          <option value="Ascendentemente">Ascendentemente</option>
          <option value="Descendentemente">Descendentemente</option>
        </select>
      </div>
    </div>




  )
}

