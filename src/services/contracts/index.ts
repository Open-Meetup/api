import HDWalletProvider from "@truffle/hdwallet-provider";
import { ethers } from "ethers";
import { assertDefined } from "../../utils/invariants";

const { RPC_PROVIDER_URL, GANACHE_SEED, GANACHE_URL } = process.env;

const provider = (() => {
  if (process.env.NODE_ENV === "development") {
    // You can run a test blockchain locally using this command:
    // `npx ganache --database.dbPath db -d -b 5`
    // then pass the seed phrase to GANACHE_SEED inside .env
    assertDefined(GANACHE_SEED, "GANACHE_SEED must be defined!");
    return new ethers.providers.Web3Provider(
      new HDWalletProvider({
        mnemonic: {
          phrase: GANACHE_SEED,
        },
        providerOrUrl: GANACHE_URL || "http://localhost:8545",
      })
    );
  }
  assertDefined(RPC_PROVIDER_URL, "RPC_PROVIDER_URL must be defined!");
  return new ethers.providers.JsonRpcProvider(RPC_PROVIDER_URL);
})();

export default provider;
