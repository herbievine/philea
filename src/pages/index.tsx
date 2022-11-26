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
import * as z from "zod";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  const [tempAddress, setTempAddress] = useState("");
  const { error } = useAppStateStore((state) => state);
  const { address, setAddress } = useAddressStore((state) => state);

  const handleAddressChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setTempAddress(target.value);
    if (
      z
        .string()
        .regex(/^0x[0-9a-fA-F]{40}$/)
        .safeParse(target.value).success
    ) {
      setAddress(target.value);
    }
  };

  return (
    <div className="w-full h-screen flex justify-evenly items-center">
      <Hero height={500} />
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
