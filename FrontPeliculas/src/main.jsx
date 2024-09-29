import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavMenu from './assets/components/NavMenu.jsx';
import CrearPelicula from './pages/peliculas/CrearPelicula.jsx';
import ListaPeliculas from './pages/peliculas/ListaPeliculas.jsx';
import CrearDirector from './pages/directores/CrearDirector.jsx';
import ListaDirectores from './pages/directores/ListaDirectores.jsx';
import CrearActor from './pages/actores/CrearActor.jsx';
import ListaActores from './pages/actores/ListaActores.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DetallePelicula from './pages/peliculas/DetallePelicula.jsx';
import EditarEliminarPelicula from './pages/peliculas/editarEliminarPelicula.jsx';
import EditarPelicula from './pages/peliculas/editarPelicula.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <Router>
      <NavMenu />
      <Routes>
        <Route path="/peliculas" element={<ListaPeliculas />} />
        <Route path="/peliculas/editar" element={< EditarEliminarPelicula />} />
        <Route path="/editar-pelicula/:id" element={<EditarPelicula />} />
        <Route path="/peliculas/:id" element={<DetallePelicula />} />
        <Route path="/peliculas/create" element={<CrearPelicula />} />
        <Route path="/directores" element={<ListaDirectores />} />
        <Route path="/directores/create" element={<CrearDirector />} />
        <Route path="/actores" element={<ListaActores />} />
        <Route path="/actores/create" element={<CrearActor />} />
        {/* Agrega más rutas según sea necesario */}
      </Routes>
    </Router>
  </StrictMode>
);
