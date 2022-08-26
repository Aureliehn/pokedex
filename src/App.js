import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PageNotFound from './page/page-not-found';
import './App.css';
import PokemonsDetail from './page/pokemon-detail';
import PokemonList from './page/pokemon-list';
import PokemonEdit from './page/pokemon-edit';


const App = () =>{

  return(
    <Router>
      <div>
        <nav>
          <div className='nav-wrapper teal'>
            <Link to="/" className="brand-logo center">Pokédex</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<PokemonList></PokemonList>} />
          <Route path="/pokemons" element={<PokemonList></PokemonList>} />
          <Route path="/pokemons/:id" element={<PokemonsDetail/>} />
          <Route path="/pokemons/:id" element={<PokemonsDetail></PokemonsDetail>} />
          <Route path="pokemon/edit/:id" element={<PokemonEdit></PokemonEdit>} />
          <Route  path='*' element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
