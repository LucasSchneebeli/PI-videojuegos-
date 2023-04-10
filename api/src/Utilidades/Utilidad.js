function videojuegoUtilidades (videojuego) {
    return {
        id: videojuego.id,
        nombre: videojuego.name,
        descripcion: videojuego.description,
        lanzamiento: videojuego.released,
        rating: videojuego.rating,
        plataformas: videojuego.platforms,
        genero: videojuego.genres,
        imagen: videojuego.background_image
    }
}

module.exports = {
    videojuegoUtilidades
}
