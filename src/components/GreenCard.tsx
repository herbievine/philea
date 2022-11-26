import type React from "react";
import Seed from "../assets/Seed";

interface IGreenCardProps {
  totalEmissions: number;
}

const GreenCard: React.FC<IGreenCardProps> = ({ totalEmissions }) => {
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
      </div>
    </div>
  );
};

export default GreenCard;
