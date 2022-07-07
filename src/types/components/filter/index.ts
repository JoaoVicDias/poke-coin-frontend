export interface IFilterProps {
    filterConfig: {
        filterName: string;
        placeholder: string;
        filterType: string;
    }[]
    onActionFilter: (event: React.ChangeEvent<HTMLInputElement>, filterName: string) => void;
}