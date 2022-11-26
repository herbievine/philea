import { useQuery } from "react-query";
import { chainId } from "wagmi";
import * as z from "zod";

const explorerApiResponse = z.object({
  status: z.string(),
  message: z.string(),
  result: z.record(z.string(), z.string()),
});

const useCurrencyPrice = (
  chain?: number
): { value: number; status: string } => {
  const { data } = useQuery(["currencyPrice", chain], async () => {
    try {
      if (chain === chainId.mainnet) {
        const res = explorerApiResponse.parse(
          await (
            await fetch(
              `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
            )
          ).json()
        );

        return {
          value: parseFloat(res.result.ethusd),
          status: "ok",
        };
      } else if (chain === chainId.polygon) {
        const res = explorerApiResponse.parse(
          await (
            await fetch(
              `https://api.polygonscan.com/api?module=stats&action=ethprice&apikey=${process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY}`
            )
          ).json()
        );

        return {
          value: parseFloat(res.result.maticusd),
          status: "ok",
        };
      } else if (chain === 56) {
        const res = explorerApiResponse.parse(
          await (
            await fetch(
              `https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=${process.env.NEXT_PUBLIC_BSCSCAN_API_KEY}`
            )
          ).json()
        );

        return {
          value: parseFloat(res.result.ethusd),
          status: "ok",
        };
      }
    } catch (error) {
      return {
        value: 0,
        status: "error",
      };
    }
  });

  return data ?? { value: 0, status: "loading" };
};

export { useCurrencyPrice };
