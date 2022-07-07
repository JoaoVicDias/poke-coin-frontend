import React from "react";

export interface IInputDefault {
  value: string;
  placeHolder: string;
  type: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name: string;
}
