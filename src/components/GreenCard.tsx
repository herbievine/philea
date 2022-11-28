import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";
import Seed from "../assets/Seed";
import { useContractAddress } from "../hooks/useContractAddress";

interface IGreenCardProps {
  totalEmissions: number;
}

const GreenCard: React.FC<IGreenCardProps> = ({ totalEmissions }) => {
  const { query } = useRouter();
  const [deptPaid, setDeptPaid] = useState(0);
  const contractAddress = useContractAddress();
  const { isConnected } = useAccount();
  const { data, isLoading } = useBalance({
    address: query.address as `0x${string}`,
    token: contractAddress,
  });

  useEffect(() => {
    if (data?.formatted) {
      setDeptPaid(
        (parseFloat(data?.formatted ?? "0") / 1_000_000 / totalEmissions) * 100
      );
    }
  }, [data?.formatted, totalEmissions]);

  return (
    <div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 p-8 flex flex-col items-center rounded-xl shadow-md bg-[#0e76fd] text-white">
        <div className="flex items-center space-x-2">
          <h1 className="font-black text-lg">Your Carbon Footprint Card</h1>
          <Seed width={20} fill="white" />
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
          <span className="text-3xl font-black">
            {(totalEmissions * 1000).toFixed(2)}kg of CO
            <sub className="font-black">2</sub>
          </span>
          <span className="text-3xl font-black">
            or approx ${(totalEmissions * 25).toFixed(2)}
          </span>
        </div>
        {isConnected ? (
          <div>
            <span className="font-black text-lg">
              Dept paid off: {deptPaid.toFixed(2)}% or{" "}
              {(parseFloat(data?.formatted ?? "0") / 1_000).toFixed(2)}kg
            </span>
            <div className="w-full h-10 bg-blue-500 rounded-lg">
              {!isLoading && data && (
                <div
                  style={{
                    width: `${
                      deptPaid > 100 ? 100 : deptPaid < 0 ? 0 : deptPaid
                    }%`,
                  }}
                  className="h-10 bg-blue-400 rounded-lg"
                ></div>
                // <span className="text-3xl font-black">
                //   Debt paid off: {parseFloat(data.formatted) / 1_000}kg
                // </span>
              )}
            </div>
          </div>
        ) : (
          <ConnectButton label="Connect Wallet to see Debt Coverage" />
        )}
      </div>
    </div>
  );
};

export default GreenCard;
