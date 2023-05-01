import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Detalles.module.css';


function stripHTMLTags(str) {
  if (!str || typeof str !== 'string') {
    return '';
  }

  return str.replace(/<[^>]*>/g, '');
}



export default function Detalles() {
  const [detalles, setDetalles] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/videogames/${id}`);
        console.log('res.data:', res.data)
        setDetalles(res.data);

      } catch (error) {
        console.error('Error al obtener los detalles del juego:', error);
      }
    };
    fetchDetalles();
  }, [id]);
  console.log(detalles)
  console.log(id)

  const generosString = detalles && detalles.generos && detalles.generos.map((genero, index) => (
    <span key={index}>
      {genero.name}
      {index < detalles.generos.length - 1 ? ', ' : ''}
    </span>
  ));

  const strippedDescription = detalles && detalles.descripcion ? stripHTMLTags(detalles.descripcion) : '';


    let plataformas;
    let generos;

    if (id.length < 10) {
      plataformas = detalles?.plataformas?.map((plataforma => plataforma.platform.name)).join(', ');
      generos = detalles?.generos?.map(genero => genero.name).join(', ');
    } else {
      plataformas = detalles?.plataformas.join(', ')
      generos = detalles?.genres?.map(genero => genero.name).join(', ')
    }


  return (
    <div classname={styles.container}>
      {detalles ? (
        <>
          <h1>{detalles.nombre}</h1>
          <img src={detalles.imagen} alt={detalles.nombre} />
          <p>Descripción: {strippedDescription}</p>
          <p>Rating: {detalles.rating}</p>
          <p>ID: {id}</p>
          <p>Fecha de lanzamiento: {detalles.lanzamiento}</p>
          <p>Plataformas:{' '}
        
  {detalles.plataformas &&
    detalles.plataformas.map((plataforma, index) => (
      <span key={index}>
        {plataformas}
      </span>
    ))}
</p>

<p>Generos: {generos}</p>

<Link to="/home" className={styles.volverBoton}>Regresar al inicio</Link> 
       

        </>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
}