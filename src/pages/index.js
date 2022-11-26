"use strict";
exports.__esModule = true;
var Chevron_1 = require("../assets/Chevron");
var react_1 = require("react");
var useAddressStore_1 = require("../hooks/useAddressStore");
var useAppStateStore_1 = require("../hooks/useAppStateStore");
var link_1 = require("next/link");
var Hero_1 = require("../assets/Hero");
var z = require("zod");
var Home = function () {
    var _a = (0, react_1.useState)(""), tempAddress = _a[0], setTempAddress = _a[1];
    var error = (0, useAppStateStore_1.useAppStateStore)(function (state) { return state; }).error;
    var _b = (0, useAddressStore_1.useAddressStore)(function (state) { return state; }), address = _b.address, setAddress = _b.setAddress;
    var handleAddressChange = function (_a) {
        var target = _a.target;
        setTempAddress(target.value);
        if (z
            .string()
            .regex(/^0x[0-9a-fA-F]{40}$/)
            .safeParse(target.value).success) {
            setAddress(target.value);
        }
    };
    return (<div className="w-full h-screen flex justify-evenly items-center">
      <Hero_1["default"] height={500}/>
      <div className="flex flex-col space-y-4">
        <div className="w-1/6 h-4 bg-black"/>
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
          <input type="text" value={tempAddress} onChange={handleAddressChange} placeholder="Or Enter your Ethereum Address..." className={"px-4 py-2 grow shadow-lg rounded-lg focus:outline-none ".concat((error === null || error === void 0 ? void 0 : error.key) === "address" && "ring-2 ring-red-500")}/>
          <link_1["default"] href={address ? "/address/".concat(address) : "#"} className={"px-4 py-2 flex items-center shadow-lg rounded-lg focus:outline-none hover:scale-105 duration-75 ".concat(address ? "bg-[#0e76fd] text-white" : "text-gray-400")}>
            Go <Chevron_1["default"] className="ml-2 -rotate-90"/>
          </link_1["default"]>
        </div>
      </div>
    </div>);
};
exports["default"] = Home;
