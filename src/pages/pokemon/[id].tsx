import { useRouter } from "next/router"
import react,{ useEffect, useState } from 'react';
import { Pokemons } from "@/interface";
import { fetchPokemon, handleRelease } from "@/function";
import { CountContext } from "@/context/context";

export default function PokemonDetail() {
    const router = useRouter();
    const {id} = router.query;
    const [pokemon, setPokemon] = useState<Pokemons | null>(null);
    const [havePokemon, setHavePokemon] = useState([]);
    const [ctr, setCtr] = useState(0);
    const countContext:any = react.useContext(CountContext)
    
    const dataFetch = async (url:string) => {
        const temp = await fetchPokemon(url);
        setPokemon(temp);
    }

    useEffect(() => {
        if(id){
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            dataFetch(url);
            const data = window.localStorage.getItem(""+id)
            setHavePokemon(JSON.parse(data as any))
            setCtr(JSON.parse(localStorage.getItem(id+"") as string)?.length)
        }
    }, [id])

    return (
        <>  
            <div className="container my-2">
                <div className="row d-flex justify-content-center mx-1">
                    {/* Pokemon */}
                    <div className="col-md-5 mx-2 border rounded d-flex flex-column justify-content-center border-secondary">
                        <h3 className="text-center mt-2">Pokemon</h3>
                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}/>
                        <div className="d-flex justify-content-center flex-column text-center">
                            <span className="my-1">Name : <span className="text-uppercase">{pokemon?.name}</span></span>
                            <span className="my-1">Base XP : {pokemon?.base_experience}</span>
                            <span className="my-1">Height : {pokemon?.height}</span>
                            <span className="my-1">Weight : {pokemon?.weight}</span>
                        </div>
                        <div className="text-center mt-1">
                            <button type="button" className="btn btn-success mb-2" onClick={() => router.push(`/catch/${pokemon?.name}`)}>Catch <span className="text-uppercase">{pokemon?.name}</span></button>
                        </div>
                    </div>
                    {/* Abilities and Move */}
                    <div className="col-md-6 mx-2 border rounded border-secondary">
                        <div>
                            <h4 className="text-center mt-2">Abilities & Moves</h4>
                            <div className="my-2">
                                <span className="me-1">Ability : </span>
                                    {pokemon?.['abilities'].map((ability:any) => {
                                        return (
                                            <span className="me-1">{ability['ability']['name']},</span>
                                        )
                                    })}
                            </div>
                            <div className="my-2">
                                <span className="me-1">Moves :</span>
                                    {pokemon?.['moves'].map((move:any) => {
                                        return (
                                            <span className="me-1">{move['move']['name']},</span>
                                        )
                                    })}
                            </div>
                            <div className="my-2">
                                <span className="me-1">Types : </span>
                                    {pokemon?.['types'].map((type :any) => {
                                        return (
                                            <span className="me-1">{type['type']['name']}</span>
                                        )
                                    })}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="row">
                            <h4 className="mt-3 text-center">Stats</h4>
                            <div className="col d-flex flex-column">
                                <span>hp: {pokemon?.stats[0].base_stat}</span>
                                <span>special-attack: {pokemon?.stats[3].base_stat}</span>
                            </div>
                            <div className="col d-flex flex-column">
                                <span>attack: {pokemon?.stats[1].base_stat}</span>
                                <span>special-defence: {pokemon?.stats[4].base_stat}</span>
                            </div>
                            <div className="col d-flex flex-column">
                                <span>defence: {pokemon?.stats[2].base_stat}</span>
                                <span>speeed: {pokemon?.stats[5].base_stat}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mx-5 border rounded mt-4 border-secondary">
                    {havePokemon != null && (
                        <div>
                            <div className="my-2 d-flex justify-content-center">
                                <h5>You have&nbsp;
                                    {ctr}
                                </h5>
                                <h5 className="text-uppercase">&nbsp;{pokemon?.name}</h5>
                            </div>
                            {havePokemon.map((poke: any) => {
                                return (
                                <div className="d-flex align-items-center">
                                    <span className="fs-5">nickname : {poke}</span>
                                    <button className="btn btn-danger ms-5 mb-2" onClick={() => {handleRelease(countContext,pokemon?.name+"",poke);location.reload()}}>Release</button>
                                </div>
                                )
                            })}
                        </div>
                    )}
                    {havePokemon == null && (
                        <div className="my-4 d-flex justify-content-center">
                            <h5>You currently don't have&nbsp;</h5>
                            <h5 className="text-uppercase">{pokemon?.name}</h5>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

