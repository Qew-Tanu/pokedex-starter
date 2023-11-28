import { Type } from '@/interface/pokemondetail';
import { Link } from 'react-router-dom';

interface PokemonCardProps {
    image: string
    name: string
    id: number
    types: Type[]


}

const PokemonCard = ({ image, name, id, types }: PokemonCardProps) => {
    return (
        <div key={name} className="max-w-sm rounded-[20px] overflow-hidden shadow dark:bg-gray-800 dark:border-gray-700 m-auto" >
            <div className="bg-[url('/images/poke-card-bg.png')] bg-center aspect-square w-full bg-cover">
                <Link to={`/detail/${name}`} >
                    <img className="rounded-t-lg m-[auto] h-auto p-[40px] w-full" src={image} alt="" />
                </Link>
            </div>
            <div className="p-5 bg-[#14234d]">
                <div className='flex justify-between'>
                    <h5 className="capitalize mb-2 text-2xl font-bold tracking-tight text-white">{name}</h5>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">#{id}</h5>
                </div>
                <div className='flex gap-2 justify-end align-middle'>
                    {types.map((item) => {
                        return (
                            <span className={`badge-type-${item.type.name} p-[5px] px-3 rounded-[10px]`} key={item.slot} >
                                {item.type.name}
                            </span>
                        )
                    })}

                </div>

            </div>
        </div>

    );
};


export default PokemonCard;