import { ElementStates } from "../../types/element-states";

export type TStringArray = string[];

export type TSortingStringArray = {
  value: string;
  type: ElementStates;
};

export type TSortingNumberArray = {
  value: number;
  type: ElementStates;
};

export type TSortingArray = {
  value: any;
  type: ElementStates;
};
