import type { NextPage } from "next";
import type React from "react";
import Chevron from "../assets/Chevron";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { useAddressStore } from "../hooks/useAddressStore";
import { useAppStateStore } from "../hooks/useAppStateStore";
import Link from "next/link";
import Hero from "../assets/Hero";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  const [tempAddress, setTempAddress] = useState("");
  const { error } = useAppStateStore((state) => state);
  const { address, setAddress } = useAddressStore((state) => state);
  const { address: connectedAddress, isDisconnected } = useAccount();
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (connectedAddress) setAddress(connectedAddress);
  }, [connectedAddress, setAddress, isDisconnected]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempAddress(e.target.value);
    if (e.target.value.trim().match(/^0x[0-9a-fA-F]{40}$/)) {
      setAddress(e.target.value);
      disconnect();
    }
  };

  useEffect(() => {
    console.log({ error });
  }, [error]);

  return (
    <div className="w-full h-screen flex justify-evenly items-center">
      <div className="">
        <Hero height={500} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="w-1/6 h-4 bg-black" />
        <h1 className="text-2xl font-black">
          Acknowledge the impact of your transactions
        </h1>
        <h2>
          We have created a simple tool for you to discover the impact of your
          <br />
          transactions and find solutions to reduce your carbon footprint.
        </h2>
        <ol className="ml-2">
          <li>1. Connect or enter your Ethereum address</li>
          <li>2. Wait while we analyse your transactions</li>
          <li>3. Discover ways to reduce your carbon footprint</li>
        </ol>
        <div className="w-full flex items-center space-x-4">
          <ConnectButton chainStatus="icon" showBalance={false} />
          <input
            type="text"
            value={tempAddress}
            onChange={handleAddressChange}
            placeholder="Or Enter your Ethereum Address..."
            className={`px-4 py-2 grow shadow-lg rounded-lg focus:outline-none ${
              error?.key === "address" && "ring-2 ring-red-500"
            }`}
          />
          <Link
            href={address ? `/address/${address}` : "#"}
            className={`px-4 py-2 flex items-center shadow-lg rounded-lg focus:outline-none hover:scale-105 duration-75 ${
              address ? "bg-[#0e76fd] text-white" : "text-gray-400"
            }`}
          >
            Go <Chevron className="ml-2 -rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
