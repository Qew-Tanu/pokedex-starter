import { create } from 'zustand'
import { IPokemonDetailResponse } from "@/interface/pokemondetail"

const initStore = {
  pokemon: {
    data: [],
    loading: false,
    error: null,
  },
  fetchpokemon: {
    data: [],
    loading: false,
    error: null,
  }
}

type pokemonType = {
  data: IPokemonDetailResponse[] | any,
  loading: boolean,
  error: null | any,
}

type UsePokemonListStoreType = {
  pokemon: pokemonType
  fetchpokemon: pokemonType
  setPokemonList: (value: pokemonType) => void,
  setfetchPokemonList: (value: pokemonType) => void,
  clearPokemon: () => void,

}

export const usePokemonListStore = create<UsePokemonListStoreType>((set) => ({
  ...initStore,
  setPokemonList: (value: pokemonType) => set({ pokemon: value }),
  setfetchPokemonList: (value: pokemonType) => set({ fetchpokemon: value }),
  clearPokemon: () => set({ ...initStore }),
}))

