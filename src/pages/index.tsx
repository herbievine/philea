import type { NextPage } from "next";
import type React from "react";
import Chevron from "../assets/Chevron";
import { useState } from "react";
import Link from "next/link";
import Hero from "../assets/Hero";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  const [address, setAddress] = useState("");

  const handleAddressChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(target.value);
  };

  return (
    <div className="w-full h-screen px-6 flex flex-col md:flex-row md:justify-evenly items-center">
      <div className="hidden md:block">
        <Hero width={500} />
      </div>
      <div className="flex flex-col space-y-4">
        <div className="w-1/6 h-4 bg-black hidden md:block" />
        <h1 className="text-2xl font-black">
          Acknowledge the impact of your transactions
        </h1>
        <h2>
          We have created a simple tool for you to discover the impact of your
          <br />
          transactions and find solutions to reduce your carbon footprint.
        </h2>
        <ol className="space-y-2">
          <li>1. Connect or enter your Ethereum address</li>
          <li>2. Wait while we analyse your transactions</li>
          <li>3. Discover ways to reduce your carbon footprint</li>
        </ol>
        <div className="w-full flex items-center space-x-4">
          <div className="px-4 py-2 grow shadow-lg rounded-lg">
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
              placeholder="Or Enter your Ethereum Address..."
              className="w-full focus:outline-none"
            />
          </div>
          <Link
            href={
              address.match(/^0x[0-9a-fA-F]{40}$/) ? `/address/${address}` : "#"
            }
            className={`px-4 py-2 flex items-center shadow-lg rounded-lg focus:outline-none hover:scale-105 duration-75 ${
              address.match(/^0x[0-9a-fA-F]{40}$/)
                ? "bg-[#0e76fd] text-white"
                : "text-gray-400"
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
