
const axios = require('axios')
const { Videogame, Genres } = require('../db.js')
const { Op } = require('sequelize')
const { videojuegoUtilidades } = require('../Utilidades/Utilidad.js')



const getVideogames = async (req, res) => {

    let resultadoAPI = []
    const api = await axios.get(`https://api.rawg.io/api/games?key=${process.env.MY_API_KEY}`)
    const api2 = api?.data.next ? await axios.get(api.data.next) : null
    const api3 = api2?.data.next ? await axios.get(api2.data.next) : null
    const api4 = api3?.data.next ? await axios.get(api3.data.next) : null
    const api5 = api4?.data.next ? await axios.get(api4.data.next) : null


    const videojuegosCreados = await Videogame.findAll()

    resultadoAPI = [...api?.data.results, ...api2?.data.results, ...api3?.data.results, ...api4?.data.results, ...api5.data.results]


    resultadosAPI = resultadosAPI.map(videojuegoUtilidades)

    let resultado = [...resultadosAPI, ...videojuegosCreados]
    res.status(200).json(resultado)

}




const getVideogameById = async (req, res) => {
    const { id } = req.params;



    try {
        const videojuegoDB = await Videogame.findbyPk(id)
        if (videojuegoDB) { return res.status(200).json(videjuegoDB) }

    } catch (error) {

        console.log('buscando en la API, un momento por favor')
    }

    try {

        const api = await axios.get(`https://api.rawg.io/api/games/${id}?key=${process.env.MY_API_KEY}`)

        const todalainfo = api.data

        const resultado = videojuegoUtilidades(todalainfo)

        if (api) return res.status(200).json(resultado)


    } catch (error) {
        res.status(404).json({ message: 'No se encontro el videojuego', error })

    }
}

const getVideogameByName = async (req, res) => {
    const { name } = req.query;
    let juegosBuscados = []

    try {
        const videojuegoDB = await Videogame.findAll({
            where: {
                nombre: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        if (videojuegoDB) primerosJuegos = [...videojuegoDB]

    } catch (error) {

        console.log('buscando en la API, un momento por favor')
    }


    try {

        let apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${process.env.MY_API_KEY}&search=${name}`)
        const primerosJuegos = api?.data.reuslts

        primerosJuegos.forEach(juego => {
            if (juego.name.toLowerCase().includes(name.toLowerCase())) {
                juegosBuscados.push(videojuegoUtilidades(juego))

            }
        })


        apiUrl = api.data.next


    } catch (error) {
        res.status(404).json({ message: 'No se encontro el videojuego', error })
    }
    res.status(200).json(juegosBuscados.slice(0, 15));

}

const CreandoVideojuego = async (req, res) => {
    const { nombre, descripcion, lanzamiento, rating, plataformas, generos } = req.body;
    try {
        const videojuegoCreado = await Videogame.create({
            nombre,
            descripcion,
            lanzamiento,
            rating,
            plataformas,

        })

        if (generos.length > 0) {
            await Promise.all(generos.map(async (genero) => {
                const g = Genres.findOrCreate({
                    where: {
                        nombre: genero
                    }
                })
                await videojuegoCreado.addGenres(g[0])
            }))
        }

        const videojuegoConGenero = await Videogame.findByPk(videojuegoCreado.id, {
            include: Genres,
        })





       return res.status(201).json(videojuegoConGenero)

    } catch (error) {
        res.status(404).json({ message: 'No se encontro el videojuego', error })
    }
}

const LlamandoGeneros = async (req, res) => {
    const generos = await axios.get(`https://api.rawg.io/api/genres?key=${process.env.MY_API_KEY}`)
    res.status(200).json(generos.data.results)

    await generos.data.results.map(genero => {
         Genres.findOrCreate({
            where: {
                nombre: genero.name
            }
        })
    })


}
const getGeneros = async (req, res) => {
    const generos = await Genres.findAll()
    res.status(200).json(generos)
}

module.exports = {
    getVideogames,
    getVideogameById,
    getVideogameByName,
    CreandoVideojuego,
    LlamandoGeneros,
    getGeneros
}
