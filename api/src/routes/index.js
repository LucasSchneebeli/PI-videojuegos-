const { Router } = require('express');
const { getVideogames, getVideogameById, getVideogameByName, CreandoVideojuego, getGeneros } = require('../Controllers/Videjuegos.controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('/videogames', (req, res) => {

if (req.query.name) {
    getVideogameByName(req, res)
} else {
    getVideogames(req, res)
}
});



router.get('/videogames/:idVideogames', getVideogameById);

router.get('videogames/name', getVideogameByName);

router.post('/videogames', CreandoVideojuego);

router.get('/genres', getGeneros);



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
