import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import DonateCard from "../../components/DonateCard";
import GreenCard from "../../components/GreenCard";
import HowDonate from "../../components/HowDonate";
import SmartBCard from "../../components/SmartBCard";
import { emissionsApiSchema, etherscanApiSchema } from "../../lib/schema";

interface IAddressProps {}

const Address: NextPage<IAddressProps> = () => {
  const { address } = useRouter().query;
  const [error, setError] = useState<string | null>(null);
  const { data: txs, isLoading: loadingTxs } = useQuery(
    ["txs"],
    async () => {
      try {
        return etherscanApiSchema.parse(
          await (
            await fetch(
              `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
            )
          ).json()
        ).result;
      } catch {
        setError("Error fetching data. Please try again later.");
      }
    },
    { enabled: !!address }
  );
  const { data, isLoading: loadingEmissions } = useQuery(
    ["emissions"],
    async () => {
      try {
        let i = 0;
        let totalEmissions = 0;
        const emissionsResponse = emissionsApiSchema.parse(
          await (await fetch("/static/eth_emissions.json")).json()
        );

        txs?.forEach((tx) => {
          if (parseInt(tx.blockNumber) > 15537394) return;

          for (i; i < emissionsResponse.length; i++) {
            if (
              dayjs.unix(parseInt(tx.timeStamp)).format("YYYY-MM-DD") ===
              emissionsResponse[i].date
            ) {
              totalEmissions += emissionsResponse[i].emissions_per_tx;
              break;
            }
          }
        });

        return totalEmissions;
      } catch {
        setError("Error fetching data. Please try again later.");
      }
    },
    {
      enabled: !!txs && !!address,
    }
  );

  useEffect(() => console.log({ data }), [data]);

  if (loadingEmissions || loadingTxs)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Computing your transactions...
      </div>
    );
  if (error)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        {error}
      </div>
    );

  return (
    <div className="w-full h-screen grid overflow-hidden grid-cols-2 grid-rows-2">
      <GreenCard totalEmissions={data ? data / 1_000 : 0} />
      <HowDonate />
      <SmartBCard />
      <DonateCard totalEmissions={data ? data / 1_000 : 0} />
    </div>
  );
};

export default Address;
