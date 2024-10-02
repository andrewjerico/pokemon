import { useRouter } from "next/router";
import react,{ useEffect, useState } from "react";
import { Pokemon } from "@/interface";
import { fetchPokemon, handleSubmits } from "@/function";
import { CountContext } from "@/context/context";

function Catch(){
    const router = useRouter();
    const {id} = router.query;
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const [capture, setCapture] = useState(Math.floor(Math.random() * 2))
    const [pokeName, setPokeName] = useState("");
    const countContext:any = react.useContext(CountContext)

    const dataFetch = async (url:string) => {
        const temp = await fetchPokemon(url);
        setPokemon(temp);
    }

    useEffect(() => {
        if(id){
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`
            dataFetch(url)
        }
    }, [id])

    const handleOnChange = (event:any) => {
        const newPoke = ""+event.target.value;
        setPokeName(newPoke);
    }
    
    const handleSubmit = (event:any,pokemonName:string , newName:string) => {
        event.preventDefault();
        handleSubmits(countContext,pokemonName,newName);
        router.push(`/pokemon/${pokemon?.name}`)
    }

    if(capture == 1){
        return ( 
            <>  
                <div className="text-center mt-3">
                    <div className="d-flex justify-content-center">
                        <h4>Success Catch Pokemon&nbsp;</h4>
                        <h4 className="text-uppercase"> {pokemon?.name} &#x2714;</h4>
                    </div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}/>
                    <div className="d-flex justify-content-center">
                        <form action="">
                            <div className="d-flex justify-content-center">
                                <input className="form-control" type="text" placeholder="Enter Nickname" name="name" id="name" onChange={handleOnChange}/>
                                <button className="btn btn-success" onClick={(event) => handleSubmit(event,pokemon?.name + "", pokeName)}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
        )
    }
    else{
        return ( 
            <>  
                <div className="text-center mt-3">
                    <div className="d-flex justify-content-center">
                        <h4>Failed Catch Pokemon&nbsp;</h4>
                        <h4 className="text-uppercase"> {pokemon?.name} &#x2716;</h4>
                    </div>
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}/>
                    <div>
                        <button className="btn btn-primary" onClick={() => router.push(`/pokemon/${pokemon?.name}`)}>Return</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Catch;