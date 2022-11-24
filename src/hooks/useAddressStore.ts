import create from "zustand";
import * as z from "zod";
import { devtools, persist } from "zustand/middleware";
import { useAppStateStore } from "./useAppStateStore";

interface AddressStore {
  address: string;
  setAddress: (address: string) => void;
}

const useAddressStore = create<AddressStore>()(
  devtools(
    persist(
      (set) => ({
        address: "",
        setAddress: (address: string) => {
          if (
            z.string().parse(address) &&
            address.trim().match(/^0x[0-9a-fA-F]{40}$/)
          ) {
            set({ address });
          } else {
            useAppStateStore.getState().setError({
              key: "address",
              msg: "Invalid address",
            });
          }
        },
      }),
      {
        name: "address-storage",
      }
    )
  )
);

export { useAddressStore };
