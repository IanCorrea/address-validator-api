export type AddressInput = {
  rawAddress: string;
};

export type AddressOutput = {
  valid: boolean;
  status: "valid" | "corrected" | "unverifiable";
  address?: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
};
