import create from "zustand";
import * as z from "zod";
import { devtools } from "zustand/middleware";

interface Error {
  key: "address" | "no-txs" | "unknown";
  msg: string;
}

interface AppStateStore {
  loading: boolean;
  setLoading: (state: boolean) => void;
  error: Error | null;
  setError: (state: Error | null) => void;
}

const useAppStateStore = create<AppStateStore>()(
  devtools(
    (set) => ({
      loading: false,
      setLoading: (state: boolean) => {
        try {
          z.boolean().parse(state);
          set({ loading: state });
        } catch (error) {
          set({
            error: {
              key: "unknown",
              msg: "Invalid state",
            },
          });
        }
      },
      error: null,
      setError: (state: Error | null) => {
        set({ error: state });
      },
    }),
    {
      name: "app-state-storage",
    }
  )
);

export { useAppStateStore };
