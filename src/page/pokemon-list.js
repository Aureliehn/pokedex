import React, { useEffect, useState } from "react";
import PokemonService from "../services/pokemon-service";
import PokemonCard from "../components/pokemon-card";
// import POKEMONS from "../models/mock-pokemon";
import {Link} from 'react-router-dom'

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
                <Link className="btn-floating btn-large waves-effect waves-link red z-depth-3"
                style={{position:"fixed", bottom: "25px", right:"25px"}}
                to="/pokemon/add">
                    <i className="material-icons">+</i>
                </Link>
            </div>
        </div>
    )
}
export default PokemonList;