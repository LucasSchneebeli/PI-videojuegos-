import React from 'react';


function Paginado({ totalJuegos, juegosPorPagina, paginaActual, onPageChange }) {
  const numeroDePaginas = Math.ceil(totalJuegos / juegosPorPagina);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      {Array.from({ length: numeroDePaginas }, (_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          style={paginaActual === index + 1 ? { fontWeight: 'bold' } : {}}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Paginado;
