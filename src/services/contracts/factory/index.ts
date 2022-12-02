import { Contract } from "ethers";
import web3Provider from "../index";
import communityFactoryABI from "./abi/factory";

const { FACTORY_ADDRESS } = process.env;

const factory = new Contract(
  FACTORY_ADDRESS,
  communityFactoryABI,
  web3Provider
);

export const existsCommunity = async (
  communityAddress: string
): Promise<boolean> => factory.existsCommunity(communityAddress);
