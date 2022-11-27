import { useRouter } from "next/router";
import type React from "react";
import { useBalance } from "wagmi";
import Seed from "../assets/Seed";
import { CONTRACT_ADDRESS } from "../lib/web3";

interface IGreenCardProps {
  totalEmissions: number;
}

const GreenCard: React.FC<IGreenCardProps> = ({ totalEmissions }) => {
  const { query } = useRouter();
  const { data, isLoading } = useBalance({
    address: query.address as `0x${string}`,
    token: CONTRACT_ADDRESS,
  });

  return (
    <div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 p-8 flex flex-col rounded-xl shadow-md bg-[#0e76fd] text-white">
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
        <div>
          <span className="font-black text-lg">
            Dept paid off:{" "}
            {(
              (parseFloat(data?.formatted ?? "0") /
                10_000 /
                (totalEmissions * 25)) *
              100
            ).toFixed(2)}
            %
          </span>
          <div className="w-full h-10 bg-blue-500 rounded-lg">
            {!isLoading && data && (
              <div
                style={{
                  width: `${
                    (parseFloat(data.formatted) /
                      10_000 /
                      (totalEmissions * 25)) *
                    100
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
      </div>
    </div>
  );
};

export default GreenCard;
