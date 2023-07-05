import { contractAddress } from "./contractAddress";

const config = {
  rpcUrl: process.env.RPC_URL,
  signingKey: process.env.SIGNING_KEY,
  entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
  simpleAccountFactory: contractAddress,
  paymaster: {
    rpcUrl: process.env.PAYMASTER_RPC_URL,
    context: { type: "payg" },
  },
};

module.exports = config;
