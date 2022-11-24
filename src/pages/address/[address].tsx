import { ConnectButton } from "@rainbow-me/rainbowkit";
import dayjs from "dayjs";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useAccount, chainId } from "wagmi";
import Giving from "../../assets/Giving";
import Seed from "../../assets/Seed";
import DonateCard from "../../components/DonateCard";
import GreenCard from "../../components/GreenCard";
import HowDonate from "../../components/HowDonate";
import SmartBCard from "../../components/SmartBCard";
import { useAppStateStore } from "../../hooks/useAppStateStore";
import { emissionsApiSchema, etherscanApiSchema } from "../../lib/schema";

interface IAddressProps {}

const getExplorerUrl = (chain: number, address: any) => {
  if (chain === chainId.mainnet) {
    return(`https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY}`)
  } else {
    return(`https://api.bscscan.com/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.NEXT_PUBLIC_BSCSCAN_API_KEY}`);
  }
}

const Address: NextPage<IAddressProps> = () => {
  const [totalEmissions, setTotalEmissions] = useState(0);
  const { address } = useRouter().query;
  const { loading, setLoading, error, setError } = useAppStateStore((s) => s);
  const { address: connectedAddress, isConnected, connector } = useAccount();
  const { data: txs } = useQuery(
    ["txs"],
    async () => {
      setLoading(true);
      setTotalEmissions(0);
      const chain = await connector?.getChainId();
      if (chain === undefined) {
        setError({
          key: "no-txs",
          msg: "No chain selected",
        });
        setLoading(false);
        return [];
      }
      const url = getExplorerUrl(chain, address);
      const txsResponse = etherscanApiSchema.parse(
        await (
          await fetch(
            url
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

  if (loading)
    return (
      <div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  if (!txs || txs?.length === 0)
    return <div>No transactions found for this address</div>;

  return (
    <div className="w-full h-screen grid overflow-hidden grid-cols-2 grid-rows-2">
      <GreenCard
        totalEmissions={totalEmissions}
        firstTxTimestamp={txs[0].timeStamp}
      />
      <HowDonate />
      <SmartBCard />
      <DonateCard totalEmissions={totalEmissions} />
    </div>
  );
};

export default Address;
