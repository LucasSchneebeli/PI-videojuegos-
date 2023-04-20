import './App.css';
import {Routes, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detalles from './components/Detalles/Detalles';
import CreacionDeJuego from './components/Creacion-De-Juego/CreacionDeJuego';





function App() {
  return (
    <div className="App">
  
      <Routes>
        <Route path="/" element={<Landing/>  }/>
        <Route path="/videogames/create" element={<CreacionDeJuego/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path='/videogame/:id' element={<Detalles/>}/>
      </Routes>

    </div>
  );
}

export default App;
