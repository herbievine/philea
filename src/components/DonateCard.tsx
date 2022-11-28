import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import type React from "react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { useCurrencyPrice } from "../hooks/useCurrencyPrice";
import contractAbi from "../lib/contractAbi.json";
import { ethers } from "ethers";
import { useContractAddress } from "../hooks/useContractAddress";
import Loading from "../assets/Loading";

interface IDonateCardProps {
  totalEmissions: number;
}

const DonateCard: React.FC<IDonateCardProps> = ({ totalEmissions }) => {
  const { reload, query } = useRouter();
  const [donateValue, setDonateValue] = useState(0);
  const [deptPercent, setDeptPercent] = useState(0);
  const { isConnected, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { chain } = useNetwork();
  const { value, status } = useCurrencyPrice(chain?.id);
  const contractAddress = useContractAddress();
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: "sendDonation",
    args: [query?.address],
    overrides: {
      value: ethers.utils.parseEther(
        donateValue ? donateValue.toString() : "0"
      ),
    },
  });
  const { isLoading, write, isSuccess } = useContractWrite({
    ...config,
    onSuccess() {
      setTimeout(() => reload(), 1000 * 5);
    },
  });

  const handleDonateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") setDonateValue(0);
    setDonateValue(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (donateValue) {
      setDeptPercent(donateValue / ((totalEmissions * 25) / value));
    } else {
      setDeptPercent(0);
    }
  }, [donateValue, totalEmissions, value]);

  // if (typeof window === "undefined") return <p>loading...</p>;

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
                  <p>{(deptPercent * 100).toFixed(2)}% covered</p>
                )}
              </div>
              <input
                type="number"
                value={donateValue}
                onChange={handleDonateChange}
                placeholder={`Donation Amount in ${chain?.nativeCurrency?.name}`}
                className={`px-4 py-2 w-full shadow-lg rounded-lg focus:outline-none ${
                  donateValue > parseFloat(balance?.formatted ?? "")
                    ? "ring-2 ring-red-500"
                    : deptPercent >= 1 && "ring-2 ring-green-500"
                }`}
              />
              <div className="w-full flex justify-end items-center space-x-4">
                <span className="text-gray-700">
                  {donateValue ? `$${(donateValue * value).toFixed(2)}` : "$0"}
                </span>
                <button
                  disabled={donateValue > parseFloat(balance?.formatted ?? "")}
                  onClick={() => write?.()}
                  className="px-4 py-2 shadow-lg rounded-lg bg-[#0e76fd] text-white focus:outline-none hover:scale-105 duration-75"
                >
                  {isSuccess ? (
                    <div className="flex items-center">
                      <Loading width={28} />
                      <p>Success! Redirecting...</p>
                    </div>
                  ) : donateValue > parseFloat(balance?.formatted ?? "") ? (
                    "Insufficient Balance"
                  ) : isLoading ? (
                    <div className="flex items-center">
                      <Loading width={28} />
                      <p>Processing...</p>
                    </div>
                  ) : (
                    `Donate ${!donateValue ? 0 : donateValue} ${
                      chain?.nativeCurrency?.symbol
                    }`
                  )}
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
