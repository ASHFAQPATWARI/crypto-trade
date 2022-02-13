import { DECIMAL_LIMIT } from "constants/constants";

export const formatPrice = (price: number) => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: DECIMAL_LIMIT,
  }).format(price);
};
