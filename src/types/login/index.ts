import React from "react";

interface IInput {
  name: string;
  value: string;
  placeHolder: string;
  type: string;
  isValid: boolean;
  validationRules: {
    isEmail?: boolean;
    minLength?: number;
    isRequired?: boolean;
  };
}

export interface IFormInputsState {
  [key: string]: IInput;
  email: IInput;
  password: IInput;
}

export interface IFormLogin {
  inputs: IInput[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onToggleIsLoginHandler: () => void;
  isDisabled: boolean;
  isLogin: boolean;
  loading: boolean;
}
