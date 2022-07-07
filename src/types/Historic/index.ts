export interface IHistoricState {
  id: string;
  type: "purchase" | "sale";
  name: string;
  amount: number;
  price: number;
  createdAt: string;
}

export interface IListHistoric {
  historic: IHistoricState[];
  loading: boolean;
  isEmpty: boolean;
}
