import Pokemon from "../models/pokemon";
 
export default class PokemonService {
 
  static async getPokemons() {
    const response = await fetch('http://localhost:3004/pokemons');
      return await response.json();
  }
 
  static async getPokemon(id) {
    const response = await fetch(`http://localhost:3004/pokemons/${id}`);
      const data = await response.json();
      return this.isEmpty(data) ? null : data;
  }
 
  static isEmpty(data) {
    return Object.keys(data).length === 0;
  }
}