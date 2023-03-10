import axios from 'axios';
import { api } from '../../api/index';
import { POKEMONS_LOAD, POKEMON_LOAD, POKEMON_EVOLUTION_LOAD } from '../types';

export const getPokemons = () => {
  return async (dispatch) => {
    try {
      const allPokemon = await api.get('/pokemon?limit=100');
      const pokemonData = await Promise.all(
        allPokemon.data.results.map(async (pokemon) => {
          const pokemonRecord = await axios.get(pokemon.url);

          return pokemonRecord.data;
        })
      );
      dispatch({
        type: POKEMONS_LOAD,
        data: pokemonData,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getPokemon = (id) => {
  return async (dispatch) => {
    try {
      const soloPokemon = await api.get(`/pokemon/${id}`);

      dispatch({
        type: POKEMON_LOAD,
        data: soloPokemon.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
export const getEvolutionPokemon = (id) => {
  console.log(id);
  return async (dispatch) => {
    try {
      const specialPokemon = await api.get(`/pokemon-species/${id}`);
      const evoChain = await axios.get(specialPokemon.data.evolution_chain.url);

      dispatch({
        type: POKEMON_EVOLUTION_LOAD,
        data: evoChain.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
