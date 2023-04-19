import { ORDENAR_POR_NOMBRE, ORDENAR_POR_RATING, FILTRAR_API_O_BASEDEDATOS, TOMAR_JUEGOS, NUEVO_ESTADO } from './actions'


const initialState = {
    videojuegos: [],
    videojuegosFiltrados: [],
    selectedOption: 'Ambos',
    ordenOption:  ''
}
export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOMAR_JUEGOS:
            return {
                videojuegos: action.payload
            }
        case ORDENAR_POR_NOMBRE:
            if (action.payload === 'A-Z'){
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.nombre > b.nombre ? 1 : -1),
                    ordenOption: 'A-Z'
                } 
            } else if (action.payload === 'Z-A'){
                    return {
                        ...state,
                        videojuegos: [...state.videojuegos].sort((a, b) => a.nombre < b.nombre ? 1 : -1),
                        ordenOption: 'Z-A'

                    }
            }
            return state;

       case ORDENAR_POR_RATING:
            if (action.payload === 'Ascendentemente'){
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.rating > b.rating ? 1 : -1),
                    ordenOption: 'Ascendentemente'
                }
            } else if (action.payload === 'Descendentemente'){
                return {
                    ...state,
                    videojuegos: [...state.videojuegos].sort((a, b) => a.rating < b.rating ? 1 : -1),
                    ordenOption: 'Descendentemente'
                }
            }

    //     case FILTRAR_API_O_BASEDEDATOS:
    //         if (action.payload === 'Ambos'){
    //         return {
    //             ...state.videojuegosFiltrados  
    //         } }  else if (action.payload === 'API'){
    //             return {
    //                 ...state, videojuegosFiltrados: state.videojuegos.filter(juego => juego.id.length < 5)
    //         }
               
    //     } else if (action.payload === 'Base de Datos'){
    //         return {
    //             ...state, videojuegosFiltrados: state.videojuegos.filter(juego => juego.id.length > 7)
    //     }
    // }

    case NUEVO_ESTADO: 
        return {...state, 
            selectedOption: action.payload
        }


            
        default: 
            return state;
    }
}

