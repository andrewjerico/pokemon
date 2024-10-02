import axios from "axios";

const handleRelease = (countContext:any,pokemonName:string, name:string) => {
  const getLocalStorage: string[] | null = (JSON.parse(localStorage.getItem(pokemonName)!))
  let index = getLocalStorage!.indexOf(name);
  if(index != -1){
    getLocalStorage!.splice(index,1);
    localStorage.setItem(pokemonName , JSON.stringify(getLocalStorage))
  }
  let ctr = JSON.parse(window.localStorage.getItem(pokemonName) as any)?.length
  if(ctr == 0){
    localStorage.removeItem(pokemonName)
  }
  countContext.countDispatch({type: 'DECREMENT'})
};

const handleSubmits = (countContext:any,pokemonName:string , newName:string) => {
  const data = (window.localStorage.getItem(""+pokemonName))
  if(data == null){
    window.localStorage.setItem(pokemonName as string, JSON.stringify([newName]))
  }
  else{
    const getLocalStorage: string[] | null = (JSON.parse(localStorage.getItem(pokemonName+"")!))
    getLocalStorage?.push(newName)
    localStorage.setItem(pokemonName as string, JSON.stringify(getLocalStorage))
  }
  countContext.countDispatch({type: 'INCREMENT'})
}

const fetchPokemon = async (url :string) => {
  try {
    const res = await axios.get(url)
    const newPokemon = res.data;
    return newPokemon
  } 
  catch (error: any) {
    console.log(error.message)
    console.log("Error")
    return "error"
  }
}

const initStorage = (countContext:any) => {
  let count = JSON.parse(window.localStorage.getItem('count') as any);
  if(count){
    countContext.countDispatch({type: 'SET',payload:count});
  }else{
    countContext.countDispatch({type: 'SET',payload:0});
  }
}

export {handleRelease,handleSubmits,fetchPokemon,initStorage};