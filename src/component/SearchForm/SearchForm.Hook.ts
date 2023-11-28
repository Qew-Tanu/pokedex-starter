import { IPokemonDetailResponse } from "@/interface/pokemondetail";
import { pokemonDetailServices, pokemonListServices } from "@/service";
import { usePokemonListStore } from "@/store/pokemonListStore";
import { generationList } from "@/utlis/optionList";
import { useEffect } from "react";
import { useForm } from "react-hook-form";


const useSearchform = () => {

    const { register, watch, formState: { } } = useForm()

    const keyword = watch('keyword')
    const generation = watch('generation')
    const type = watch('type')
    const sort = watch('sort')

    const { setfetchPokemonList, fetchpokemon, setPokemonList } = usePokemonListStore()


    const callData = async (generation: {
        name: string,
        limit: number,
        offset: number
    }) => {
        setfetchPokemonList({ data: [], loading: true, error: null })
        const responseList = await pokemonListServices.getPokemonList(generation.limit, generation.offset)
        const pokeList = []


        if (responseList.status === 200) {
            const responseResults = responseList.data?.results || []
            for (const pokemon of responseResults) {
                const response = await pokemonDetailServices.getPokemonDetail(pokemon.name)
                const pokeData = response.data
                if (pokeData) {
                    pokeList.push({
                        ...pokeData,
                        image:
                            pokeData.sprites.other.home.front_default ||
                            pokeData.sprites.other["official-artwork"].front_default
                    })
                }

            }
            setfetchPokemonList({
                data: pokeList,
                loading: false,
                error: null,
            })
            setPokemonList({
                data: pokeList,
                loading: false,
                error: null,
            })



        } else {
            setfetchPokemonList({ data: [], loading: false, error: responseList.error })
        }


    }

    const filterPokemon = (keyword: string, type: string, sort: 'id' | 'name') => {
        const keywordFilter = fetchpokemon.data.filter((item: IPokemonDetailResponse) => item.name.toLowerCase().includes(keyword?.toLowerCase()))
        const typeFilter = type !== 'all types'
            ? keywordFilter.filter((item: IPokemonDetailResponse) =>
                item.types.find((test) => test.type.name.toLowerCase().includes(type.toLowerCase())))
            : keywordFilter
        return SortBy(typeFilter, sort)
    }

    const SortBy = (data: IPokemonDetailResponse, sort: 'id' | 'name') => {
        switch (sort) {
            case 'id':
                return data.sort((a, b) => a.id - b.id)
            case 'name':
                return data.sort((a, b) => a.name > b.name ? 1 : a.name < b.name ? -1 : 0)
            default:
                return data.sort((a, b) => a.id - b.id)
        }
    }


    useEffect(() => {



        if (generation !== undefined) {
            callData(generationList[generation])
        } else {
            callData(generationList[0])
        }


    }, [generation])


    useEffect(() => {
        const data = filterPokemon(keyword, type, sort)
        setPokemonList({ data: data, loading: false, error: null })
    }, [keyword, sort, type, fetchpokemon.loading])


    return {
        fieldKeyword: register("keyword"),
        fieldGeneration: register("generation"),
        fieldType: register("type"),
        fieldKSort: register("sort"),

    }

}

export { useSearchform }
