const { Router } = require('express');
const { getVideogames, getVideogameById } = require('../Controllers/Videjuegos.controllers');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.get('videgames/', getVideogames)


router.get('/videgames/:idVideogames', getVideogameById);

router.get('videgames/', (req, res) => {
    let name = req.query.name;
    console.log(name);
    res.send('Hola Mundo');
});

router.post('/videgames', (req, res) => {
    res.send('Hola Mundo');
});

router.get('/genres', (req, res) => {
    res.send('Hola Mundo');
});



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
