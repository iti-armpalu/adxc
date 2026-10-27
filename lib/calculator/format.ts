export const formatUsd = (n: number) =>
    n.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
    });