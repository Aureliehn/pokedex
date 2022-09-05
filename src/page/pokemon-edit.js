import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PokemonForm from '../components/pokemon-form';
import PokemonService from '../services/pokemon-service';

const PokemonEdit = () => {
    const {id} = useParams()  
    const [pokemon, setPokemon] = useState(null);

  
  useEffect(() => {
    // POKEMONS.forEach(pokemon => {
    //   if (id === pokemon.id.toString()) {
    //     setPokemon(pokemon);
    //   }
    // })
    fetch(`http://localhost:3004/pokemons/${id}`)
    PokemonService.getPokemon(id).then(pokemon =>setPokemon(pokemon))
  }, [id]);
    
  return (
    <div>
      { pokemon ? (
        <div className="row">
            <h2 className="header center">Éditer { pokemon.name }</h2>
            <PokemonForm pokemon={pokemon} isEditForm={true}></PokemonForm>
        </div>
      ) : (
        <h4 className="center">Aucun pokémon à afficher !</h4>
      )}
    </div>
  );
}
  
export default PokemonEdit;