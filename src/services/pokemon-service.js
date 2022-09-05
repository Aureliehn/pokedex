import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static async getPokemons() {
    const response = await fetch('http://localhost:3004/pokemons');
      return await response.json();
    // return fetch('http://localhost:3004/pokemons')
    //     .try(response=>response.json())
    //     .catch(error => this.handleError(error)) 
  }
 
  static async getPokemon(id) {
    // return fetch(`http://localhost:3004/pokemons/${id}`)
    // .try(response =>response.json())
    // .try(data=>this.isEmpty(data)?null:data)
    // .catch(error=>this.handleError(error))
    const response = await fetch(`http://localhost:3004/pokemons/${id}`);
      const data = await response.json();
      return this.isEmpty(data) ? null : data;
  }

  static updatePokemon(pokemon){
    // let pokemon=Pokemon
    return fetch(`http://localhost:3004/pokemons/${pokemon.id}`,{
        method: 'PUT',
        body: JSON.stringify(pokemon),
        headers: {'Content-Type':'application/json'}
    })
    .then(response=>response.json())
  }

  static deletePokemon(pokemon){
    return fetch(`http://localhost:3004/pokemons/${pokemon.id}`,{
        method: 'DELETE',
        headers: {'Content-Type':'application/json'},
    })
    .then(response =>response.json())
  }
 
  static addPokemon(pokemon){
    delete pokemon.created
    return fetch(`http://localhost:3004/pokemons`,{
        method: 'POST',
        body: JSON.stringify(pokemon),
        headers: {'Content-Type':'application/json'},
    })
    .then(response =>response.json())
  }

  static isEmpty(data) {
    return Object.keys(data).length === 0;
  }

  static handleError(){
    let error
    console.error(error)
  }
}