import { ConnectButton } from "@rainbow-me/rainbowkit";
import { parseEther } from "ethers/lib/utils.js";
import type React from "react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useNetwork,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { useCurrencyPrice } from "../hooks/useCurrencyPrice";

interface IDonateCardProps {
  totalEmissions: number;
}

const DonateCard: React.FC<IDonateCardProps> = ({ totalEmissions }) => {
  const [donateValue, setDonateValue] = useState(0);
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();
  const { value, status } = useCurrencyPrice(chain?.id);
  const { config } = usePrepareSendTransaction({
    request: {
      to: "0x0fee0EB39307bE9c9cCBb505bF1258d1dF6B7345",
      value: parseEther((!donateValue ? 0 : donateValue).toFixed(2)),
    },
  });
  const { isLoading, sendTransaction } = useSendTransaction({
    ...config,
    onSuccess(data, variables, context) {
      console.log("success", data, variables, context);
    },
  });

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
                <p>Donate {chain?.nativeCurrency?.name}</p>
                {status === "ok" && (
                  <p>
                    {!donateValue
                      ? 0
                      : (
                          (donateValue / ((totalEmissions * 0.025) / value)) *
                          100
                        ).toFixed(2)}
                    % covered
                  </p>
                )}
              </div>
              <input
                type="number"
                value={donateValue}
                onChange={handleDonateChange}
                placeholder={`Donation Amount in ${chain?.nativeCurrency?.name}`}
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
                    ? "Processing..."
                    : `Donate ${!donateValue ? 0 : donateValue} ${
                        chain?.nativeCurrency?.symbol
                      }`}
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
