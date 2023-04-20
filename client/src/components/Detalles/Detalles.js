import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


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

  return (
    <div>
      {detalles ? (
        <>
          <h1>{detalles.nombre}</h1>
          <img src={detalles.imagen} alt={detalles.nombre} />
          <h2>{generosString}</h2>
          <p>{strippedDescription}</p>
          <p>Rating: {detalles.rating}</p>
          <p>Plataformas:{' '}
  {detalles.plataformas &&
    detalles.plataformas.map((plataforma, index) => (
      <span key={index}>
        {plataforma.platform.name}
        {index < detalles.plataformas.length - 1 ? ', ' : ''}
      </span>
    ))}
</p>
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
}