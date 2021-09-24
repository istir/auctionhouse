export interface simplifiedUser {
  firstName: string;
  lastName: string;
  birthDateAsString: string;
  email: string;
  phoneNumber: string;
}

export interface RemainingTime {
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}
