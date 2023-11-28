import { IPokemonDetailResponse } from "@/interface/pokemondetail"
import { POKEMON_BASE_URL } from "@/utlis/constant"
import { IResponse, handleResponse } from "@/utlis/handleResponse"
import axios from "axios"



interface IGetPokemonDetailsResponse extends IResponse {
    status: number | undefined,
    data?: IPokemonDetailResponse
}

export const pokemonDetailServices = {
    getPokemonDetail: async (
        name: string
    ): Promise<IGetPokemonDetailsResponse> => {
        try {
            const response = await axios.get(`${POKEMON_BASE_URL}/pokemon/${name}`)
            return handleResponse.success(response)
        } catch (error: any) {
            return handleResponse.error(error)
        }
    },
}

