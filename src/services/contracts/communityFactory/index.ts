import { Contract } from "ethers";
import web3Provider from "../index";
import communityFactoryABI from "./abi/communityFactory";

const { COMMUNITY_FACTORY_ADDRESS } = process.env;

const communityFactory = new Contract(
  COMMUNITY_FACTORY_ADDRESS,
  communityFactoryABI,
  web3Provider
);

export const exists = async (communityAddress: string): Promise<boolean> =>
  communityFactory.exists(communityAddress);
