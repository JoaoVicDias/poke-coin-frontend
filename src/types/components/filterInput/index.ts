export interface IIpuntProps {
    type: string;
    name: string;
    placeHolder: string;
    className?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}