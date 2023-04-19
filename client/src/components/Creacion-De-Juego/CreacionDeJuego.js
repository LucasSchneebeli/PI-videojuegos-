import React, { useState } from 'react';
import { useEffect } from 'react';
import styles from './CreacionDeJuego.module.css';




function Creacion() {
    const [formValues, setFormValues] = useState({
      nombre: '',
      imagen: '',
      descripcion: '',
      plataformas: [],
      fechaLanzamiento: '',
      rating: '',
      generos: []
    });
    console.log(formValues)

    const [generosDisponibles, setGenerosDisponibles] = useState([]);

    useEffect(() => {
      const fetchGeneros = async () => {
        try {
          const response = await fetch('http://localhost:3001/genres');
          const data = await response.json();
          setGenerosDisponibles(data);
        } catch (error) {
          console.error('Error al obtener géneros:', error);
        }
      };
  
      fetchGeneros();
    }, []);
  
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'plataformas') {
        const plataformas = value.split(',');
        setFormValues({ ...formValues, plataformas });
        return;
      }
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleGeneroChange = (e) => {
      const { value } = e.target;
      const generos = formValues.generos.includes(value)
        ? formValues.generos.filter((g) => g !== value)
        : [...formValues.generos, value];
      setFormValues({ ...formValues, generos });
    };

    // const handleEnviar = (e) => {
    //   e.preventDefault();
    //   fetch ('http://localhost:3001/videogames', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formValues)
    // })
    // .then(res => res.json())
    // .then(data => {
    //   console.log(data)
    // })
    // .catch(err => console.log(err))
    // }
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Agrega tus validaciones aquí
      if (!formValues.nombre.match(/^[a-zA-Z0-9 ]+$/)) {
        alert('El nombre del videojuego no debe contener símbolos.');
        return;
      }
  
      if (parseFloat(formValues.rating) > 10 || parseFloat(formValues.rating) < 0) {
        alert('El rating no puede exceder el rango de 0 a 10.');
        return;
      }
  
      console.log(formValues);

      fetch ('http://localhost:3001/videogames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .then(alert('Videojuego creado con éxito'))
    .catch(err => console.log(err))
    };
  
    return (
      <div className={styles.App}>
        <h1>Crear un nuevo videojuego</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input type="text" name="nombre" value={formValues.nombre} onChange={handleChange} />
          </label>
          <br />
          <label>
            Imagen:
            <input type="text" name="imagen" value={formValues.imagen} onChange={handleChange} />
          </label>
          <br />
          <label>
            Descripción:
            <textarea name="descripcion" value={formValues.descripcion} onChange={handleChange}></textarea>
          </label>
          <br />
          <label>
            Plataformas:
            <input type="text" name="plataformas" value={formValues.plataformas} onChange={handleChange} />
          </label>
          <br />
          <label>
            Fecha de lanzamiento:
            <input type="date" name="fechaLanzamiento" value={formValues.fechaLanzamiento} onChange={handleChange} />
          </label>
          <br />
          <label>
            Rating:
            <input type="number" name="rating" step="0.1" value={formValues.rating} onChange={handleChange} />
          </label>
          <br />
          <label>
            Géneros:
            <select multiple onChange={handleGeneroChange}>
            {generosDisponibles.map((genero) => (
              <option key={genero.id} value={genero.nombre}>
                {genero.nombre}
              </option>
            ))}
            </select>
          </label>
          <br />

            <button type="submit">Crear videojuego</button>

        </form>
        </div>
    );
    }

export default Creacion;