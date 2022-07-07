import React from "react";

export interface IPokemonModal {
    isOpen: boolean;
    onClose: () => void;
    contentSubmitButton: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>, name: string, amount: number, onClose: () => void) => void;
    imgUrl: string;
    name: string;
    price: number;
}