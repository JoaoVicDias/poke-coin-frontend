export interface IMyPokemonsPage {
  onFetchWalletHandler: () => void;
}

export interface IPokemonsPage {
  onFetchWalletHandler: () => void;
}

export interface IFilterState {
  [key: string]: string;
  name: string;
}

export interface IPokemons {
  name: string;
  url: string;
  amount?: number;
  amountSpent?: number;
  currentValue?: number;
}

export interface IPaginateState {
  start: number;
  end: number;
}

export interface IListPokemonsProps {
  pokemons: IPokemons[];
  top?:string;
  buttonContent: string;
  classNameButton: string;
  loading: boolean;
  isEmpty: boolean;
  onOpenPokemonModalHandler: (imageUrl: string, name: string, price: number) => void;
}

export interface PokemonCardProps {
  pokemonUrl: string;
  amount?: number;
  amountSpent?: number;
  currentValue?: number;
  top?:string;
  buttonContent: string;
  onOpenPokemonModalHandler: (imageUrl: string, name: string, price: number) => void;
  classNameButton: string;
}

export interface IPokemonInformations {
  id: string;
  name: string;
  base_experience: number;
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  defaultImg: string;
}

export interface IPokemonModalState {
  isOpen: boolean;
  imgUrl: string;
  name: string;
  price: number;
}