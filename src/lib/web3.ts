import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const { chains, provider } = configureChains(
  [chain.mainnet /*chain.polygon*/],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        // if (chain.id === 1)
        return {
          http: `https://eth-mainnet.nodereal.io/v1/${process.env.NEXT_PUBLIC_RPC_API_KEY}`,
        };

        // return {
        //   http: `https://polygon-mainnet.nodereal.io/v1/${process.env.RPC_API_KEY}`,
        // };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Philea",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export { wagmiClient, chains };
