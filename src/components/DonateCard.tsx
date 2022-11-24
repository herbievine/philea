import { ConnectButton } from "@rainbow-me/rainbowkit";
import type React from "react";
import { useState } from "react";
import { useAccount } from "wagmi";

interface IDonateCardProps {
  totalEmissions: number;
}

const DonateCard: React.FC<IDonateCardProps> = ({ totalEmissions }) => {
  const [donateValue, setDonateValue] = useState(0);
  const { isConnected } = useAccount();

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
                <p>Donate USDC</p>
                <p>
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
                </p>
              </div>
              <input
                type="number"
                value={donateValue}
                onChange={handleDonateChange}
                placeholder="Donation Amount in USDC"
                className="px-4 py-2 w-full shadow-lg rounded-lg focus:outline-none"
              />
              <div className="w-full flex justify-end">
                <button className="px-4 py-2 shadow-lg rounded-lg bg-[#0e76fd] text-white focus:outline-none hover:scale-105 duration-75">
                  Donate {!donateValue ? 0 : donateValue} USDC
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
