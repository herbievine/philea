import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useAppStateStore } from "../../hooks/useAppStateStore";
import { emissionsApiSchema, etherscanApiSchema } from "../../lib/schema";

interface IAddressProps {}

const Address: NextPage<IAddressProps> = () => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const { address } = useRouter().query;
  const { loading, setLoading, error, setError } = useAppStateStore((s) => s);
  const { data: txs } = useQuery(
    ["txs"],
    async () => {
      setLoading(true);
      setTotalEmissions(0);

      const txsResponse = etherscanApiSchema.parse(
        await (
          await fetch(
            `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`
          )
        ).json()
      );

      if (!txsResponse.result.length) {
        setError({
          key: "no-txs",
          msg: "No transactions found for this address",
        });
        setLoading(false);
      }

      return txsResponse.result;
    },
    { enabled: !!address }
  );
  const { data: emissionsData, isLoading: emissionsLoading } = useQuery(
    ["emissions"],
    async () => {
      setLoading(true);
      setTotalEmissions(0);

      let i = 0;
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
            setTotalEmissions(
              (prev) => prev + emissionsResponse[i].emissions_per_tx
            );
            break;
          }
        }
      });

      setLoading(false);

      return emissionsResponse;
    },
    {
      enabled: !!txs && !!address,
    }
  );

  return (
    <div className="">
      <h1>Address: {address}</h1>
      <h2>
        Total Emissions: {totalEmissions} kg of CO<sub>2</sub> since{" "}
        {txs && dayjs.unix(parseInt(txs[0].timeStamp)).format("DD/MM/YYYY")}
      </h2>
    </div>
  );
};

export default Address;
