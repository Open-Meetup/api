import { Request, Response } from "express";
import { Organization } from "../model/organization";

const NRP = require("node-redis-pubsub");

// @TODO add validation on request body
export const add = async (
  req: Request<{}, {}, Organization>,
  res: Response
) => {
  try {
    const url = process.env.REDIS_URL;
    const config = {
      url,
    };
    const nrp = new NRP(config);

    nrp.emit("create:organzation", { name: req.body.name });

    return res.status(201).json();
  } catch (e) {
    return res.status(500).json({
      error: (e as Error).message,
    });
  }
};
