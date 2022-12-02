import { Request, Response } from "express";
import type {
  Community as ICommunity,
  CommunityPostRequest,
} from "../model/community";
import * as factoryContract from "../services/contracts/factory";
import { Community } from "../services/db/community";

export const readByAddress = async (
  req: Request<Pick<ICommunity, "contractAddress">>,
  res: Response<ICommunity>
) => {
  try {
    const community = await Community.findOne({
      contractAddress: req.params.contractAddress,
    }).exec();
    if (!community) {
      return res.status(404).send();
    }
    return res.status(200).json(community.toJSON());
  } catch (e) {
    return res.status(404).send();
  }
};

export const create = async (
  req: Request<{}, {}, CommunityPostRequest>,
  res: Response<Pick<ICommunity, "_id" | "contractAddress"> | { error: string }>
) => {
  try {
    const community = new Community(req.body);

    const contractHasBeenDeployed = await factoryContract.existsCommunity(
      community.contractAddress
    );

    if (!contractHasBeenDeployed) {
      return res.status(404).json({
        error: "Community contract not found!",
      });
    }

    // check is community already exists
    const doc = await Community.findOne({
      contractAddress: community.contractAddress,
    }).exec();

    if (doc) {
      return res.status(500).json({
        error: "Community alredy present!",
      });
    }

    await community.save();
    return res.status(201).json(community.toJSON());
  } catch (e) {
    return res.status(500).json({
      error: (e as Error).message,
    });
  }
};
