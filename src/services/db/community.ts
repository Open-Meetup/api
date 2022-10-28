import { Schema, model } from "mongoose";
import type { Community as ICommunity } from "../../model/community";

const communitySchema = new Schema<ICommunity>({
  name: { type: String, required: true },
  contractAddress: { type: String, required: true },
});

export const Community = model<ICommunity>("Community", communitySchema);
