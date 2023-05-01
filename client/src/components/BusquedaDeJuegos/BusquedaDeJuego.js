import React from 'react'
import { useState, useEffect } from 'react'
import { FilterAPIoDB, FilterOrdenNombre, FilterRating, NuevoEstado, FilterGenero } from '../../redux/actions'
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

  const handleGenre = (event) => {
    dispatch(FilterGenero(event.target.value))
  };

  const [generosDisponibles, setGenerosDisponibles] = useState([]);

  useEffect(() => {

    dispatch(FilterGenero('Elegir'))

    const fetchGeneros = async () => {
      try {
        const response = await fetch('http://localhost:3001/genres');
        const data = await response.json();
        const nombres = data.map((g) => g.name);
        setGenerosDisponibles(nombres);
      } catch (error) {
        console.error('Error al obtener géneros:', error);
      }
    };

    fetchGeneros();
  }, []);

  console.log("Generos", generosDisponibles)


  return (
    <div className={styles.container}>
      <h3>Buscar juego segun:</h3>
      


       <div>
        <label htmlFor='dropdown'>API o BASE DE DATOS</label>
        <select value={selectedOption} onChange={handleSelect} className={styles.selectSize}>
          <option value="Elegir una opcion">--Elegir una opcion--</option>
          <option value="API">API</option>
          <option value="Base de Datos">Base de Datos</option>
          <option value='Ambos'>Ambos</option>
        </select>
        </div>
     

      <div>
        <label htmlFor='dropdown'>Género</label>
        <select onChange={handleGenre} className={styles.selectSize} >
          <option value="Elegir">--Elegir una opcion--</option>
          {generosDisponibles.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='dropdown'>Alfabeticamente</label>
        <select value={options} onChange={handleOpciones} className={styles.selectSize}>
          <option value="Elgir una opcion">--Elegir una opcion--</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
      </div>

      <div>
        <label htmlFor='dropdown'>Rating</label>
        <select value={rating} onChange={handleRating} className={styles.selectSize}>
          <option value="">--Elegir una opcion--</option>
          <option value="Ascendentemente">Ascendentemente</option>
          <option value="Descendentemente">Descendentemente</option>
        </select>
      </div>



    </div>

  )
}
