import { ORDENAR_POR_NOMBRE, ORDENAR_POR_RATING, TOMAR_JUEGOS, NUEVO_ESTADO, FILTER_GENERO } from './actions'


const initialState = {
    videojuegos: [],
    videojuegosFiltrados: [],
    selectedOption: 'Ambos',
    ordenOption: '',
    videojuegosGenero: 'Elegir'
}
export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOMAR_JUEGOS:
            return {
                videojuegos: action.payload
            }
        case ORDENAR_POR_NOMBRE:
            if (action.payload === 'A-Z') {
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.nombre > b.nombre ? 1 : -1),
                    ordenOption: 'A-Z'
                }
            } else if (action.payload === 'Z-A') {
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.nombre < b.nombre ? 1 : -1),
                    ordenOption: 'Z-A'

                }
            }
            return state;

        case ORDENAR_POR_RATING:
            if (action.payload === 'Ascendentemente') {
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.rating > b.rating ? 1 : -1),
                    ordenOption: 'Ascendentemente'
                }
            } else if (action.payload === 'Descendentemente') {
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.rating < b.rating ? 1 : -1),
                    ordenOption: 'Descendentemente'
                }
            }

        case FILTER_GENERO:
            return {
                ...state,
                videojuegosGenero: action.payload
            }

        case NUEVO_ESTADO:
            return {
                ...state,
                selectedOption: action.payload
            }

        default:
            return state;
    }
}

