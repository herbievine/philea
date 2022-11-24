import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils.js";
import type React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import {
  useAccount,
  useBalance,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";

interface IDonateCardProps {
  totalEmissions: number;
}

const DonateCard: React.FC<IDonateCardProps> = ({ totalEmissions }) => {
  const [donateValue, setDonateValue] = useState(0);
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { config } = usePrepareSendTransaction({
    request: {
      to: "0xd5d29bf172a5fA962d8CC91b228A227846b38F9A",
      value: parseEther((!donateValue ? 0 : donateValue).toFixed(2)),
    },
  });
  const { data, isLoading, isSuccess, sendTransaction } =
    useSendTransaction(config);

  const handleDonateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setDonateValue(0);
    setDonateValue(parseFloat(e.target.value));
  };

  return (
    <div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 flex flex-col justify-center items-center space-y-8">
        <div
          className={`w-full flex items-center space-x-2 ${
            isConnected ? "justify-between" : "flex-col"
          }`}
        >
          <h1 className="font-black text-2xl">Donate to SmartB</h1>
          {isConnected && <ConnectButton showBalance={false} />}
        </div>
        <div className="w-full flex flex-col items-center space-y-4">
          {isConnected ? (
            <>
              <div className="w-full flex justify-between items-center">
                <p>Donate Ethereum</p>
                {/* <p>
                  Dept{" "}
                  {!donateValue
                    ? 0
                    : Math.round(
                        parseFloat(
                          (
                            (donateValue / (totalEmissions * 0.02)) *
                            100
                          ).toFixed(2)
                        )
                      )}
                  % covered
                </p> */}
              </div>
              <input
                type="number"
                value={donateValue}
                onChange={handleDonateChange}
                placeholder="Donation Amount in USDC"
                className={`px-4 py-2 w-full shadow-lg rounded-lg focus:outline-none ${
                  donateValue > parseFloat(balance?.formatted ?? "") &&
                  "ring-2 ring-red-500"
                }`}
              />
              <div className="w-full flex justify-end">
                <button
                  disabled={donateValue > parseFloat(balance?.formatted ?? "")}
                  onClick={() => sendTransaction && sendTransaction()}
                  className="px-4 py-2 shadow-lg rounded-lg bg-[#0e76fd] text-white focus:outline-none hover:scale-105 duration-75"
                >
                  {isLoading
                    ? "loading"
                    : `Donate ${!donateValue ? 0 : donateValue} ETH`}
                </button>
              </div>
            </>
          ) : (
            <ConnectButton chainStatus="icon" showBalance={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DonateCard;
