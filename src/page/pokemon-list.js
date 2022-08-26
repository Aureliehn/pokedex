import React, { useEffect, useState } from "react";
import PokemonService from "../services/pokemon-service";
import PokemonCard from "../components/pokemon-card";
// import POKEMONS from "../models/mock-pokemon";

const PokemonList = ()=>{
    const[pokemons, setPokemons] = useState([]);

    useEffect(()=>{
        // setPokemons(POKEMONS)
        // fetch('http://localhost:3004/pokemons')
        // .then(reponse => reponse.json())
        // .then((pokemons)=>{
        //     setPokemons(pokemons)
        // })
        PokemonService.getPokemons().then((pokemons) =>{setPokemons(pokemons)})
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