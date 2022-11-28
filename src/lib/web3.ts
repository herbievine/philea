import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
  coinbaseWallet,
  braveWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { chain, chainId, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

// const bnbChain: Chain = {
//   id: 56,
//   name: "BNB Chain",
//   network: "bnbchain",
//   iconUrl:
//     "https://upload.wikimedia.org/wikipedia/commons/1/1c/BNB%2C_native_cryptocurrency_for_the_Binance_Smart_Chain.svg",
//   iconBackground: "#fff",
//   nativeCurrency: {
//     decimals: 18,
//     name: "BNB",
//     symbol: "BNB",
//   },
//   rpcUrls: {
//     default: `https://bsc-mainnet.nodereal.io/v1/`,
//   },
//   blockExplorers: {
//     default: { name: "BscScan", url: "https://bscscan.com" },
//     etherscan: { name: "BscScan", url: "https://bscscan.com" },
//   },
//   testnet: false,
// };

const { chains, provider } = configureChains(
  [/*chain.mainnet, bnbChain,*/ chain.polygon],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === chainId.mainnet) {
          return {
            http: process.env.NEXT_PUBLIC_RPC_ETHEREUM_URL ?? "",
          };
        } else if (chain.id === chainId.polygon) {
          return {
            http: process.env.NEXT_PUBLIC_RPC_POLYGON_URL ?? "",
          };
        }
        return {
          http: process.env.NEXT_PUBLIC_RPC_BSC_URL ?? "",
        };
      },
    }),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      ledgerWallet({ chains }),
      rainbowWallet({ chains }),
      metaMaskWallet({ chains }),
    ],
  },
  {
    groupName: "Other",
    wallets: [
      braveWallet({ chains }),
      coinbaseWallet({ appName: "Philea", chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const CONTRACT_ADDRESS = "0x477310FBE84B7cF18F678F63E2a95f410995340f";

export { wagmiClient, chains, CONTRACT_ADDRESS };
