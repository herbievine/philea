"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var utils_js_1 = require("ethers/lib/utils.js");
var react_1 = require("react");
var wagmi_1 = require("wagmi");
var useCurrencyPrice_1 = require("../hooks/useCurrencyPrice");
var DonateCard = function (_a) {
    var _b, _c, _d, _e, _f;
    var totalEmissions = _a.totalEmissions;
    var _g = (0, react_1.useState)(0), donateValue = _g[0], setDonateValue = _g[1];
    var _h = (0, wagmi_1.useAccount)(), isConnected = _h.isConnected, address = _h.address;
    var balance = (0, wagmi_1.useBalance)({ address: address }).data;
    var chain = (0, wagmi_1.useNetwork)().chain;
    var _j = (0, useCurrencyPrice_1.useCurrencyPrice)(chain === null || chain === void 0 ? void 0 : chain.id), value = _j.value, status = _j.status;
    var config = (0, wagmi_1.usePrepareSendTransaction)({
        request: {
            to: "0x0fee0EB39307bE9c9cCBb505bF1258d1dF6B7345",
            value: (0, utils_js_1.parseEther)((!donateValue ? 0 : donateValue).toFixed(2))
        }
    }).config;
    var _k = (0, wagmi_1.useSendTransaction)(__assign(__assign({}, config), { onSuccess: function (data, variables, context) {
            console.log("success", data, variables, context);
        } })), isLoading = _k.isLoading, sendTransaction = _k.sendTransaction;
    var handleDonateChange = function (e) {
        if (e.target.value === "")
            setDonateValue(0);
        setDonateValue(parseFloat(e.target.value));
    };
    return (<div className="w-full h-full flex justify-around items-center">
      <div className="w-2/3 h-3/4 flex flex-col justify-center items-center space-y-8">
        <div className={"w-full flex items-center space-x-2 ".concat(isConnected ? "justify-between" : "flex-col")}>
          <h1 className="font-black text-2xl">Donate to SmartB</h1>
          {isConnected && <rainbowkit_1.ConnectButton showBalance={false}/>}
        </div>
        <div className="w-full flex flex-col items-center space-y-4">
          {isConnected ? (<>
              <div className="w-full flex justify-between items-center">
                <p>Donate {(_b = chain === null || chain === void 0 ? void 0 : chain.nativeCurrency) === null || _b === void 0 ? void 0 : _b.name}</p>
                {status === "ok" && (<p>
                    {!donateValue
                    ? 0
                    : ((donateValue / ((totalEmissions * 0.025) / value)) *
                        100).toFixed(2)}
                    % covered
                  </p>)}
              </div>
              <input type="number" value={donateValue} onChange={handleDonateChange} placeholder={"Donation Amount in ".concat((_c = chain === null || chain === void 0 ? void 0 : chain.nativeCurrency) === null || _c === void 0 ? void 0 : _c.name)} className={"px-4 py-2 w-full shadow-lg rounded-lg focus:outline-none ".concat(donateValue > parseFloat((_d = balance === null || balance === void 0 ? void 0 : balance.formatted) !== null && _d !== void 0 ? _d : "") &&
                "ring-2 ring-red-500")}/>
              <div className="w-full flex justify-end">
                <button disabled={donateValue > parseFloat((_e = balance === null || balance === void 0 ? void 0 : balance.formatted) !== null && _e !== void 0 ? _e : "")} onClick={function () { return sendTransaction && sendTransaction(); }} className="px-4 py-2 shadow-lg rounded-lg bg-[#0e76fd] text-white focus:outline-none hover:scale-105 duration-75">
                  {isLoading
                ? "Processing..."
                : "Donate ".concat(!donateValue ? 0 : donateValue, " ").concat((_f = chain === null || chain === void 0 ? void 0 : chain.nativeCurrency) === null || _f === void 0 ? void 0 : _f.symbol)}
                </button>
              </div>
            </>) : (<rainbowkit_1.ConnectButton chainStatus="icon" showBalance={false}/>)}
        </div>
      </div>
    </div>);
};
exports["default"] = DonateCard;
