export interface IWalletState {
  amountSpent: number;
  currentValue: number;
}

export interface IWallet {
  loading: boolean;
  amountSpent: number;
  currentValue: number;
}

export interface INavigateState {
  [key: string]: {
    isOpen: boolean;
    name: string;
  };
  pokemons: {
    isOpen: boolean;
    name: string;
  };
  myPokemons: {
    isOpen: boolean;
    name: string;
  };
  historic: {
    isOpen: boolean;
    name: string;
  };
}

export interface INavigation {
  navigationList: {
    name: string;
    isOpen: boolean;
  }[];
  onChangeNavigationHandler: (name: string) => void;
}

export interface INavigationItem {
  isActive: boolean;
  name: string;
  onChangeNavigationHandler: (name: string) => void;
}
