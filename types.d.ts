export interface simplifiedUser {
  firstName: string;
  lastName: string;
  birthDateAsString: string;
  email: string;
  phoneNumber: string;
}

export interface RemainingTime {
  months?: number | string;
  days?: number | string;
  hours?: number | string;
  minutes?: number | string;
  seconds?: number | string;
}
export type Color =
  | "gray"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "cyan"
  | "purple"
  | "pink";
