import { useMemo } from "react";
import { chainId, useNetwork } from "wagmi";

const useContractAddress = () => {
  const network = useNetwork();

  return useMemo(() => {
    // if (network.chain?.id === 1) {
    //   return "";
    // } else
    if (network.chain?.id === 56) {
      // BSC
      return "0x58608a3884eC4580316ca8eDf0458F91f7Fd65F0";
    } else if (network.chain?.id === chainId.polygon) {
      return "0x477310FBE84B7cF18F678F63E2a95f410995340f";
    }
  }, [network]);
};

export { useContractAddress };
