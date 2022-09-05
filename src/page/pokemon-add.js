import React, {functionComponent, useState} from 'react';
import PokemonForm from '../components/pokemon-form';
import Pokemon from '../models/pokemon';

const PokemonAdd = ()=>{
    const {id} = useState(new Date().getTime());
    console.log(id)
    const {pokemon} = useState(new Pokemon(id))
    console.log(pokemon)

    return(
        <div className='row'>
            <h2 className='header center'>Ajouter un pokemon</h2>
            <PokemonForm pokemon={1} isEditForm={false}></PokemonForm>
        </div>
    )
}

export default PokemonAdd;