import { AddressOutput } from "../types/address";
import { normalizeString } from "../utils/formatter";

export function validateAndFormatAddress(raw: string): AddressOutput {
  const normalized = normalizeString(raw);

  if (!normalized || normalized.length < 5) {
    return { valid: false, status: "unverifiable" };
  }

  const regex =
    /(?<number>\d+)[,\s]+(?<street>[a-zA-Z0-9\s]+)[,\s]+(?<city>[a-zA-Z\s]+)[,\s]+(?<state>[A-Z]{2})[,\s]*(?<zip>\d{5})?/i;

  const match = normalized.match(regex);

  if (!match || !match.groups) {
    return { valid: false, status: "unverifiable" };
  }

  const { number, street, city, state, zip } = match.groups;

  return {
    valid: true,
    status: zip ? "valid" : "corrected",
    address: {
      number: number.trim(),
      street: street.trim(),
      city: city.trim(),
      state: state.trim(),
      zipCode: zip ? zip.trim() : "00000",
    },
  };
}
