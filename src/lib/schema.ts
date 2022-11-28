import * as z from "zod";

const txsSchema = z.object({
  blockNumber: z.string(),
  timeStamp: z.string(),
  hash: z.string(),
  nonce: z.string(),
  blockHash: z.string(),
  transactionIndex: z.string(),
  from: z.string(),
  to: z.string(),
  value: z.string(),
  gas: z.string(),
  gasPrice: z.string(),
  isError: z.string(),
  txreceipt_status: z.string(),
  input: z.string(),
  contractAddress: z.string(),
  cumulativeGasUsed: z.string(),
  gasUsed: z.string(),
  confirmations: z.string(),
  methodId: z.string(),
  functionName: z.string(),
});

const etherscanApiSchema = z.object({
  status: z.string(),
  message: z.string(),
  result: z.array(txsSchema),
});

const emissionsApiSchema = z.array(
  z.object({
    timestamp: z.number(),
    date: z.string(),
    total_txs: z.number(),
    emissions_per_day: z.number(),
    emissions_per_tx: z.number(),
  })
);

export { etherscanApiSchema, emissionsApiSchema };
