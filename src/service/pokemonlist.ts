import { IPokemonListResponse } from "@/interface/pokemonlist"
import { POKEMON_BASE_URL } from "@/utlis/constant"
import { handleResponse, IResponse } from "@/utlis/handleResponse"
import axios from "axios"

interface IGetPokemonListsResponse extends IResponse {
    status: number | undefined
    data?: IPokemonListResponse
}

export const pokemonListServices = {
    getPokemonList: async (
        limit?: number,
        offset?: number
    ): Promise<IGetPokemonListsResponse> => {
        try {
            const response = await axios.get(
                `${POKEMON_BASE_URL}/pokemon?limit=${limit || 151}&offset=${offset || 0}`
            )
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }
    },
}