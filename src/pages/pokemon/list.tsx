import { useRouter } from "next/router";
import react,{ useEffect, useState } from "react";
import { Pokemon } from "@/interface";
import { fetchPokemon, handleRelease, initStorage } from "@/function";
import { CountContext } from "@/context/context";

function List() {
  const [dataPokemons, setPokemon] = useState<Pokemon[]>([]);
  const router = useRouter();
  const countContext:any = react.useContext(CountContext)

  const dataFetch = async (url:string) => {
    const temp = await fetchPokemon(url);
    setPokemon(temp.results);
  }

  useEffect(() => {
    dataFetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1279");
    initStorage(countContext);
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          {dataPokemons.map((pokemon: any) => {
            const havePokemon: string[] | null = JSON.parse(
              window.localStorage.getItem(pokemon.name) as any
            );
            if (JSON.parse(window.localStorage.getItem(pokemon.name) as any)) {
              return (
                <div className="col-md-5 mx-2 mb-3">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <h4 className="text-uppercase">{pokemon.name}&nbsp;</h4>
                        <h6>
                          (owned:&nbsp;
                          {
                            JSON.parse(
                              window.localStorage.getItem(pokemon.name) as any
                            )?.length
                          }
                          )
                        </h6>
                      </div>
                      <button
                        className="btn btn-primary"
                        onClick={() => router.push(`/pokemon/${pokemon.name}`)}
                      >
                        View
                      </button>
                    </div>
                    <div className="card-body">
                      {havePokemon?.map((poke) => {
                        return (
                          <div className="d-flex justify-content-between align-items-center my-1">
                            <li>
                              <span className="card-text">{poke}</span>
                            </li>
                            <button
                              className="btn btn-danger"
                              onClick={() => {handleRelease(countContext,pokemon.name, poke)}}
                            >
                              Release
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }
          })}
          {countContext.countState.count == 0 && (
            <div className="my-4 d-flex justify-content-center">
              <h5>You currently don't have any Pokemon</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default List;