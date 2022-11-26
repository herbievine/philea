"use strict";
exports.__esModule = true;
exports.chains = exports.wagmiClient = void 0;
var rainbowkit_1 = require("@rainbow-me/rainbowkit");
var wallets_1 = require("@rainbow-me/rainbowkit/wallets");
var wagmi_1 = require("wagmi");
var jsonRpc_1 = require("wagmi/providers/jsonRpc");
var bnbChain = {
    id: 56,
    name: "BNB Chain",
    network: "bnbchain",
    iconUrl: "https://upload.wikimedia.org/wikipedia/commons/1/1c/BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg",
    iconBackground: "#fff",
    nativeCurrency: {
        decimals: 18,
        name: "BNB",
        symbol: "BNB"
    },
    rpcUrls: {
        "default": "https://bsc-mainnet.nodereal.io/v1/"
    },
    blockExplorers: {
        "default": { name: "BscScan", url: "https://bscscan.com" },
        etherscan: { name: "BscScan", url: "https://bscscan.com" }
    },
    testnet: false
};
var _a = (0, wagmi_1.configureChains)([wagmi_1.chain.mainnet, bnbChain, wagmi_1.chain.polygon], [
    (0, jsonRpc_1.jsonRpcProvider)({
        rpc: function (chain) {
            var _a, _b, _c;
            if (chain.id === wagmi_1.chainId.mainnet) {
                return {
                    http: (_a = process.env.NEXT_PUBLIC_RPC_ETHEREUM_URL) !== null && _a !== void 0 ? _a : ""
                };
            }
            else if (chain.id === wagmi_1.chainId.polygon) {
                return {
                    http: (_b = process.env.NEXT_PUBLIC_RPC_POLYGON_URL) !== null && _b !== void 0 ? _b : ""
                };
            }
            return {
                http: (_c = process.env.NEXT_PUBLIC_RPC_BSC_URL) !== null && _c !== void 0 ? _c : ""
            };
        }
    }),
]), chains = _a.chains, provider = _a.provider;
exports.chains = chains;
var connectors = (0, rainbowkit_1.connectorsForWallets)([
    {
        groupName: "Recommended",
        wallets: [
            (0, wallets_1.ledgerWallet)({ chains: chains }),
            (0, wallets_1.rainbowWallet)({ chains: chains }),
            (0, wallets_1.metaMaskWallet)({ chains: chains }),
        ]
    },
    {
        groupName: "Other",
        wallets: [
            (0, wallets_1.braveWallet)({ chains: chains }),
            (0, wallets_1.coinbaseWallet)({ appName: "Philea", chains: chains }),
            (0, wallets_1.walletConnectWallet)({ chains: chains }),
        ]
    },
]);
var wagmiClient = (0, wagmi_1.createClient)({
    autoConnect: true,
    connectors: connectors,
    provider: provider
});
exports.wagmiClient = wagmiClient;
