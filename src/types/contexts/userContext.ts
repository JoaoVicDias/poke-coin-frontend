import { ReactNode } from "react";

export interface IUserInfoState {
    id: string;
    name: string;
    email: string;
    iat: number;
    exp: number;
}

export interface IUserContext {
    isLogged: boolean;
    userInfo: IUserInfoState;
    onLogoutHandler: () => void;
    onSignInHandler: (token: string) => void;
}

export interface IUserContextProvider {
    children: ReactNode
}