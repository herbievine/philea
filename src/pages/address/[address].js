"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var dayjs_1 = require("dayjs");
var router_1 = require("next/router");
var react_1 = require("react");
var react_query_1 = require("react-query");
var DonateCard_1 = require("../../components/DonateCard");
var GreenCard_1 = require("../../components/GreenCard");
var HowDonate_1 = require("../../components/HowDonate");
var SmartBCard_1 = require("../../components/SmartBCard");
var useAppStateStore_1 = require("../../hooks/useAppStateStore");
var schema_1 = require("../../lib/schema");
var Address = function () {
    var _a = (0, react_1.useState)(0), totalEmissions = _a[0], setTotalEmissions = _a[1];
    var address = (0, router_1.useRouter)().query.address;
    var _b = (0, useAppStateStore_1.useAppStateStore)(function (s) { return s; }), loading = _b.loading, setLoading = _b.setLoading, setError = _b.setError;
    var txs = (0, react_query_1.useQuery)(["txs"], function () { return __awaiter(void 0, void 0, void 0, function () {
        var txsResponse, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setTotalEmissions(0);
                    _b = (_a = schema_1.etherscanApiSchema).parse;
                    return [4 /*yield*/, fetch("https://api.etherscan.io/api?module=account&action=txlist&address=".concat(address, "&sort=asc&apikey=").concat(process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY))];
                case 1: return [4 /*yield*/, (_c.sent()).json()];
                case 2:
                    txsResponse = _b.apply(_a, [_c.sent()]);
                    if (!txsResponse.result.length) {
                        setError({
                            key: "no-txs",
                            msg: "No transactions found for this address"
                        });
                        setLoading(false);
                    }
                    return [2 /*return*/, txsResponse.result];
            }
        });
    }); }, { enabled: !!address }).data;
    (0, react_query_1.useQuery)(["emissions"], function () { return __awaiter(void 0, void 0, void 0, function () {
        var i, emissionsResponse, _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    setLoading(true);
                    setTotalEmissions(0);
                    i = 0;
                    _b = (_a = schema_1.emissionsApiSchema).parse;
                    return [4 /*yield*/, fetch("/static/eth_emissions.json")];
                case 1: return [4 /*yield*/, (_c.sent()).json()];
                case 2:
                    emissionsResponse = _b.apply(_a, [_c.sent()]);
                    txs === null || txs === void 0 ? void 0 : txs.forEach(function (tx) {
                        if (parseInt(tx.blockNumber) > 15537394)
                            return;
                        for (i; i < emissionsResponse.length; i++) {
                            if (dayjs_1["default"].unix(parseInt(tx.timeStamp)).format("YYYY-MM-DD") ===
                                emissionsResponse[i].date) {
                                setTotalEmissions(function (prev) { return prev + emissionsResponse[i].emissions_per_tx; });
                                break;
                            }
                        }
                    });
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); }, {
        enabled: !!txs && !!address
    });
    if (loading)
        return (<div className="w-full h-screen flex justify-center items-center">
        Loading...
      </div>);
    if (!txs || (txs === null || txs === void 0 ? void 0 : txs.length) === 0)
        return <div>No transactions found for this address</div>;
    return (<div className="w-full h-screen grid overflow-hidden grid-cols-2 grid-rows-2">
      <GreenCard_1["default"] totalEmissions={totalEmissions} firstTxTimestamp={txs[0].timeStamp}/>
      <HowDonate_1["default"] />
      <SmartBCard_1["default"] />
      <DonateCard_1["default"] totalEmissions={totalEmissions}/>
    </div>);
};
exports["default"] = Address;
