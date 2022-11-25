import { Chain, connectorsForWallets } from "@rainbow-me/rainbowkit";
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

const bnbChain: Chain = {
  id: 56,
  name: 'BNB Chain',
  network: 'bnbchain',
  // iconUrl: 'https://example.com/icon.svg',
  // iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'BNB',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: `https://bsc-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_RPC_API_KEY}`,
  },
  blockExplorers: {
    default: { name: 'BscScan', url: 'https://bscscan.com' },
    etherscan: { name: 'BscScan', url: 'https://bscscan.com' },
  },
  testnet: false,
};

const { chains, provider } = configureChains(
  [chain.mainnet, bnbChain /*chain.polygon*/],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === chainId.mainnet) {
        return {
          http: `https://eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_RPC_API_KEY}`,
        };
      } else {
        return {
          http: chain.rpcUrls.default,
        };
      }
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

export { wagmiClient, chains };
