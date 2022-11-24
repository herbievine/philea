import type { NextPage } from "next";
import type React from "react";
import Chevron from "../assets/Chevron";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useAddressStore } from "../hooks/useAddressStore";
import { useAppStateStore } from "../hooks/useAppStateStore";
import Link from "next/link";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  // const [address, setAddress] = useState(null);
  const { loading } = useAppStateStore((state) => state);
  const { address, setAddress } = useAddressStore((state) => state);
  const { address: connectedAddress } = useAccount();

  useEffect(
    () => connectedAddress && setAddress(connectedAddress),
    [connectedAddress, setAddress]
  );

  return (
    <div className="w-full h-screen flex justify-around items-center">
      <div className="">image</div>
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
          {/* <input
            type="text"
            placeholder="Enter your Ethereum address..."
            className="px-4 py-2 grow shadow-lg rounded-lg focus:outline-none"
          /> */}
          <Link
            href={`/address/${address}`}
            className="px-4 py-2 flex items-center shadow-lg rounded-lg focus:outline-none hover:scale-105 duration-75"
          >
            Go <Chevron className="ml-2 -rotate-90" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
