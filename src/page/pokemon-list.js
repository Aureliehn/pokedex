import React, { useEffect, useState } from "react";

import PokemonCard from "../components/pokemon-card";
import POKEMONS from "../models/mock-pokemon";

const PokemonList = ()=>{
    const[pokemons, setPokemons] = useState([]);

    useEffect(()=>{
        setPokemons(POKEMONS)
    }, []);


    return(
        <div>
            <h1 className="center">Pokédex</h1>
            <div className="container">
                <div className="row">
                    {pokemons.map(pokemon =>(
                        <PokemonCard key={pokemon.id} pokemon={pokemon}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default PokemonList;