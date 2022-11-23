import type { NextPage } from "next";
import type React from "react";

interface IHomeProps {}

const Home: NextPage<IHomeProps> = () => {
  return (
    <div className="w-full h-screen flex justify-around items-center">
      <div className="w-full">image</div>
      <div className="w-full flex flex-col space-y-4">
        <h1 className="text-2xl font-black">
          Acknowledge the impact of your transactions
        </h1>
        <h2>
          We have created a simple tool for you to discover the impact of your
          <br />
          transactions and find solutions to reduce your carbon footprint.
        </h2>
        <ol>
          <li>1. Connect or enter your Ethereum address</li>
          <li>2. Wait while we analyse your transactions</li>
          <li>3. Discover ways to reduce your carbon footprint</li>
        </ol>
        <input
          type="text"
          placeholder="Ethereum address"
          className="w-max-lg"
        />
      </div>
    </div>
  );
};

export default Home;
