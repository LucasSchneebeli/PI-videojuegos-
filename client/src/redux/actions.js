export const ORDENAR_POR_NOMBRE = 'ORDENAR_POR_NOMBRE';
export const ORDENAR_POR_RATING = 'ORDENAR_POR_RATING';
export const FILTRAR_API_O_BASEDEDATOS = 'FILTRAR_API_O_BASEDEDATOS';
export const TOMAR_JUEGOS = 'TOMAR_JUEGOS';
export const NUEVO_ESTADO = 'NUEVO_ESTADO';
export const FILTER_GENERO = 'FILTER_GENERO';

export function FilterAPIoDB(payload) {
  return {
    type: FILTRAR_API_O_BASEDEDATOS,
    payload
  }
}

export function FilterOrdenNombre(payload) {
  return {
    type: ORDENAR_POR_NOMBRE,
    payload
  }
}

export function FilterRating(payload) {
  return {
    type: ORDENAR_POR_RATING,
    payload
  }

}



export function FilterGenero(payload) {
  return {
    type: FILTER_GENERO,
    payload,
  };
}

export function TomarJuegos(payload) {
  return {
    type: TOMAR_JUEGOS,
    payload
  }

}
export function NuevoEstado(payload) {
  return {
    type: NUEVO_ESTADO,
    payload
  }

}