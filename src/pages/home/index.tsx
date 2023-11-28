import SearchForm from "@/component/SearchForm";
import PokemonCard from "@/component/pokemonCard";
import { Type } from "@/interface/pokemondetail";
import { usePokemonListStore } from "@/store/pokemonListStore";
import ReactLoading from "react-loading";




const Homepage = () => {

    const { pokemon, fetchpokemon } = usePokemonListStore()


    return (
        <div className="w-[90%] m-[auto] max-w-[1100px]">
            <div className="flex justify-center">
                <img src="/images/logo.png" className="max-h-[80px] mt-[20px]" />
            </div>
            <SearchForm />
            {fetchpokemon.loading && (<div className="h-[600px] flex justify-center items-center">
                <ReactLoading type="spinningBubbles" color="#fff" height={'30%'} width={'30%'} />
            </div>
            )}
            {!fetchpokemon.loading && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] mt-[40px] justify-center">
                    {pokemon.data && pokemon.data?.map((item: { id: number; image: any; name: string; types: Type[]; }) => {
                        return (<div key={item.id}>
                            <PokemonCard
                                image={item.image || ''}
                                name={item.name}
                                id={item.id}
                                types={item.types}
                            />
                        </div>)
                    })}
                </div>
            )}
        </div>
    )
}

export default Homepage