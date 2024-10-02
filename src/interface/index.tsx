export interface Pokemon {
  id: number;
  name: string;
}

export interface Pokemons {
  id: number;
  name: string;
  abilities: [];
  base_experience: number;
  height: number;
  weight: number;
  moves: [];
  types: [];
  stats: {
    hp: number;
    attack: number;
    defence: number;
    "special-attack": number;
    "special-defence": number;
    speed: number;
  };
}

export interface PokemonIndex {
  name: string;
  url: string;
}

export interface PokemonProps {
  count: number;
  next: string;
  previous: string;
  dataPokemons: PokemonIndex[];
}

export interface CounterState {
  count:number
}

export interface CounterAction{
  type:string,
  payload:number
}