import type { NextPage } from "next";
import { useRouter } from "next/router";
import type React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import DonateCard from "../../components/DonateCard";
import GreenCard from "../../components/GreenCard";
import HowDonate from "../../components/HowDonate";
import SmartBCard from "../../components/SmartBCard";
import { emissionsApiSchema } from "../../lib/schema";

interface IAddressProps {}

const Address: NextPage<IAddressProps> = () => {
  const { address } = useRouter().query;
  const [error, setError] = useState<string | null>(null);
  const { data, isLoading } = useQuery(
    ["txs"],
    async () => {
      try {
        return emissionsApiSchema.parse(
          await (
            await fetch(
              `https://carbon-footprint-dot-angle-1.ew.r.appspot.com/V1?address=${address}`
            )
          ).json()
        );
      } catch (error) {
        setError("Error fetching data. Please try again later.");
      }
    },
    { enabled: !!address }
  );

  if (isLoading)
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
      <GreenCard
        totalEmissions={
          data ? (data.posData?.impact ?? 0) + (data.powData?.impact ?? 0) : 0
        }
      />
      <HowDonate />
      <SmartBCard />
      <DonateCard
        totalEmissions={
          data ? (data.posData?.impact ?? 0) + (data.powData?.impact ?? 0) : 0
        }
      />
    </div>
  );
};

export default Address;
