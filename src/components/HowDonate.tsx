import type React from "react";

interface IHowDonateProps {}

const HowDonate: React.FC<IHowDonateProps> = ({}) => {
  return (
    <div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          <div className="w-1/6 h-4 bg-black" />
          <h2 className="text-2xl font-black">
            Discover ways to reduce your carbon footprint
          </h2>
          <p>
            Here is your carbon footprint card. It shows the amount of carbon
            dioxide you have emitted since you started using Ethereum. Below you
            can donate to carbon offsetting projects to reduce your carbon
            footprint, or you can learn more about how to reduce your carbon
            footprint in the future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowDonate;
