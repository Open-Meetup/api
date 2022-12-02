import "dotenv/config";
import fs from "fs";
import path from "path";

import { ethers } from "ethers";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { Web3Provider } from "@ethersproject/providers";
import { assertDefined } from "../src/utils/invariants";
import factoryABI from "../src/services/contracts/factory/abi/factory";
import communityABI from "../src/services/contracts/community/abi/community";
import meetupABI from "../src/services/contracts/meetup/abi/meetup";

const factoryBytecode = fs.readFileSync(
  path.join(
    __dirname,
    "../src/services/contracts/factory/bytecode/factory.txt"
  ),
  "utf-8"
);

const communityBytecode = fs.readFileSync(
  path.join(
    __dirname,
    "../src/services/contracts/community/bytecode/community.txt"
  ),
  "utf-8"
);

const meetupBytecode = fs.readFileSync(
  path.join(__dirname, "../src/services/contracts/meetup/bytecode/meetup.txt"),
  "utf-8"
);

const { GANACHE_SEED, GANACHE_URL } = process.env;

assertDefined(GANACHE_SEED, "GANACHE_SEED must be defined!");

const provider = new HDWalletProvider({
  mnemonic: {
    phrase: GANACHE_SEED,
  },
  providerOrUrl: GANACHE_URL || "http://criptup.ganache:8545",
});

const web3 = new Web3Provider(provider);

(async () => {
  try {
    const signer = await web3.getSigner();

    const communityContract = new ethers.ContractFactory(
      communityABI,
      communityBytecode,
      signer
    );
    const community = await communityContract.deploy();

    const meetupContract = new ethers.ContractFactory(
      meetupABI,
      meetupBytecode,
      signer
    );
    const meetup = await meetupContract.deploy();

    const factoryContract = new ethers.ContractFactory(
      factoryABI,
      factoryBytecode,
      signer
    );
    const factory = await factoryContract.deploy(
      community.address,
      meetup.address
    );

    console.log("\n\r> Factory contract created:");
    console.log(factory.address);
  } catch (e) {
    console.error(e);
    console.error("\n\r> Contract creation failed!");
  }
  process.exit();
})();
