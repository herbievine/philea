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
exports.useCurrencyPrice = void 0;
var react_query_1 = require("react-query");
var wagmi_1 = require("wagmi");
var z = require("zod");
var explorerApiResponse = z.object({
    status: z.string(),
    message: z.string(),
    result: z.record(z.string(), z.string())
});
var useCurrencyPrice = function (chain) {
    var data = (0, react_query_1.useQuery)(["currencyPrice", chain], function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, _a, _b, res, _c, _d, res, _e, _f, error_1;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 10, , 11]);
                    if (!(chain === wagmi_1.chainId.mainnet)) return [3 /*break*/, 3];
                    _b = (_a = explorerApiResponse).parse;
                    return [4 /*yield*/, fetch("https://api.etherscan.io/api?module=stats&action=ethprice&apikey=".concat(process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY))];
                case 1: return [4 /*yield*/, (_g.sent()).json()];
                case 2:
                    res = _b.apply(_a, [_g.sent()]);
                    return [2 /*return*/, {
                            value: parseFloat(res.result.ethusd),
                            status: "ok"
                        }];
                case 3:
                    if (!(chain === wagmi_1.chainId.polygon)) return [3 /*break*/, 6];
                    _d = (_c = explorerApiResponse).parse;
                    return [4 /*yield*/, fetch("https://api.polygonscan.com/api?module=stats&action=ethprice&apikey=".concat(process.env.NEXT_PUBLIC_POLYGONSCAN_API_KEY))];
                case 4: return [4 /*yield*/, (_g.sent()).json()];
                case 5:
                    res = _d.apply(_c, [_g.sent()]);
                    return [2 /*return*/, {
                            value: parseFloat(res.result.maticusd),
                            status: "ok"
                        }];
                case 6:
                    if (!(chain === 56)) return [3 /*break*/, 9];
                    _f = (_e = explorerApiResponse).parse;
                    return [4 /*yield*/, fetch("https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=".concat(process.env.NEXT_PUBLIC_BSCSCAN_API_KEY))];
                case 7: return [4 /*yield*/, (_g.sent()).json()];
                case 8:
                    res = _f.apply(_e, [_g.sent()]);
                    return [2 /*return*/, {
                            value: parseFloat(res.result.ethusd),
                            status: "ok"
                        }];
                case 9: return [3 /*break*/, 11];
                case 10:
                    error_1 = _g.sent();
                    return [2 /*return*/, {
                            value: 0,
                            status: "error"
                        }];
                case 11: return [2 /*return*/];
            }
        });
    }); }).data;
    return data !== null && data !== void 0 ? data : { value: 0, status: "loading" };
};
exports.useCurrencyPrice = useCurrencyPrice;
