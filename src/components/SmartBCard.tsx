import type React from "react";

interface ISmartBCardProps {}

const SmartBCard: React.FC<ISmartBCardProps> = ({}) => {
  return (
    <div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 flex justify-center items-center">
        <div className="flex flex-col space-y-4">
          <div className="w-1/6 h-4 bg-black" />
          <h2 className="text-2xl font-black">
            Donate to SmartB: Project Cookstove
          </h2>
          <p>
            Increase access of households and communities to improved cookstoves
            by disseminating high thermal efficiency and low greenhouse gas
            emitting cooking stoves known as Improved Cook Stoves (ICS) to the
            rural and urban households of Uganda.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmartBCard;
