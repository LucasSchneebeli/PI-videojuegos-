
const axios = require('axios')
const {Videogame} = require('../db.js')


const getVideogames = async (req, res) => {

let resultadoAPI = []
const api = await axios.get(`https://api.rawg.io/api/games?key=${process.env.MY_API_KEY}`)
const api2 = api?.data.next ? await axios.get(api.data.next) : null
const api3 = api2?.data.next ? await axios.get(api2.data.next) : null
const api4 = api3?.data.next ? await axios.get(api3.data.next) : null
const api5 = api4?.data.next ? await axios.get(api4.data.next) : null


const videojuegosCreados = await Videogame.findAll()

resultadoAPI = [...api?.data.results, ...api2?.data.results, ...api3?.data.results, ...api4?.data.results, ...api5.data.results]


resultadosAPI = resultadosAPI.map(z =>{
    return {
        id: z.id,
        nombre: z.name,
        descripcion: z.description,
        lanzamiento: z.released,
        rating: z.rating,
        plataformas: z.platforms,
        genero: z.genres,
    }
})

let resultado = [...resultadosAPI, ...videojuegosCreados]
res.status(200).json(resultado)

}




const getVideogameById = async (req, res) => {
    const { id } = req.params;



    try {
        const videojuegoDB = await Videogame.findbyPk(id)
        if (videojuegoDB) { return res.status(200).json(videjuegoDB) }

    } catch (error) {

        console.log('buscando en la API, un momento por favor') }

    try {
       
        const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.MY_API_KEY}`)
    
        const todalainfo = api.data
    
        const resultado = {
            id: todalainfo.id,
            nombre: todalainfo.name,
            descripcion: todalainfo.description,
            lanzamiento: todalainfo.released,
            rating: todalainfo.rating,
            platformas: todalainfo.platforms,
            imagen: todalainfo.background_image,
            genero: todalainfo.genres
        }
        if(api) return res.status(200).json(resultado)
        

    } catch (error) {
        res.status(404).json({ message: 'No se encontro el videojuego', error})
   
} } 


module.exports = {
    getVideogames,
    getVideogameById
}

