import { IPokemonDetailResponse } from "@/interface/pokemondetail";
import { pokemonDetailServices } from "@/service";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type pokemonType = {
    data: IPokemonDetailResponse | undefined,
    loading: boolean,
    error: null | any,
}

const Detailpage = () => {
    const { name } = useParams()
    const [pokemon, setPokemon] = useState<pokemonType>({ data: undefined, loading: true, error: null })

    const callData = async (name: string) => {
        const response = await pokemonDetailServices.getPokemonDetail(name)
        if (response.status === 200) {
            if (response.data) {
                setPokemon({ data: { ...response.data, image: response.data.sprites.other.home.front_default || response.data.sprites.other["official-artwork"].front_default }, loading: true, error: null })
            }
        } else {
            setPokemon({ data: undefined, loading: false, error: response.error })
        }

    }
    useEffect(() => {
        if (name) {
            callData(name)

        }

    }, [name])

    return (
        <div className="w-[90%] m-[auto] max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/images/logo.png" className="max-h-[80px] mt-[20px]" />
            </div>
            <div className="flex justify-end">
                <Link to={"/"} className=" bg-[#14234d] pt-1 pb-1 pl-5 pr-5 rounded-[30px] flex justify-end text-white text-[30px]">Back</Link>
            </div>


            <div className="w-[90%] max-w-[600px] m-[auto]">
                {pokemon.data && (
                    <div className="rounded-[20px] overflow-hidden shadow m-auto bg-[#14234d]">
                        <div className="bg-[url('/images/pokemon_bg.png')] bg-center aspect-square w-full bg-cover">
                            <div>
                                <img className="rounded-t-lg m-[auto] h-auto p-[40px] pt-0 w-full" src={pokemon.data.image} alt="" />
                            </div>
                        </div>
                        <div className="p-5 bg-[#14234d]">
                            <div className='flex justify-between'>
                                <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-white">{pokemon.data.name}</h5>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">#{pokemon.data.id}</h5>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2">
                                <div>
                                    <div className="flex gap-x-[10px]">
                                        <div className=" text-[#4eb8fa] font-semibold">Height</div>
                                        <div className=" text-white">{(pokemon.data.height / 10).toFixed(2)} meter</div>
                                    </div>
                                    <div className="flex gap-x-[10px]">
                                        <div className=" text-[#4eb8fa] font-semibold">Weight</div>
                                        <div className=" text-white">{(pokemon.data.weight / 10).toFixed(2)} kg</div>
                                    </div>
                                </div>
                                <div className='flex gap-2 sm:justify-end align-bottom justify-start mt-5 sm:mt-0'>
                                    {pokemon.data.types.map((item) => {
                                        console.log(pokemon.data);

                                        return (
                                            <span className={`badge-type-${item.type.name} p-[5px] px-3 rounded-[10px] h-10`} key={item.slot} >
                                                {item.type.name}
                                            </span>
                                        )
                                    })}

                                </div>
                                <div className=" mt-5">
                                    <div className="flex gap-x-[10px] text-white">Ability</div>
                                    <div className="gap-x-[10px]">
                                        {pokemon.data.abilities.map((item, index) => {
                                            return (
                                                <div className=" text-[#4eb8fa] font-semibold " key={index}>
                                                    {item.ability.name}
                                                </div>
                                            )
                                        })}


                                    </div>
                                </div>
                                <div className=" mt-5">
                                    <div className="flex gap-x-[10px] text-white">Stat</div>

                                    {pokemon.data.stats.map((item, index) => {
                                        return (
                                            <div className=" grid grid-cols-2 gap-x-[10px]" key={index}>
                                                <div className=" text-[#4eb8fa] font-semibold">
                                                    {item.stat.name}
                                                </div>
                                                <div className=" text-[#4eb8fa] font-semibold">
                                                    : {item.base_stat}
                                                </div>
                                            </div>
                                        )
                                    })}



                                </div>
                            </div>



                        </div>
                    </div>)
                }
            </div>
        </div>

    )
}

export default Detailpage

// function setfetchPokemonList(arg0: { data: never[]; loading: boolean; error: null; }) {
//     throw new Error("Function not implemented.");
// }
