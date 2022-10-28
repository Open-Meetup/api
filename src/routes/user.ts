import express from "express";
import { body, param } from "express-validator";
import { requireSignature, validate } from "../services/validation";
import { onlySigned } from "../services/auth";
import {
  readByAddress,
  getMessageToSign,
  create,
  remove,
  update,
} from "../controllers/user";

const router = express.Router();

router.get("/message", getMessageToSign);
router.get(
  "/:wallet",
  validate([param("wallet").notEmpty().bail().isEthereumAddress()]),
  readByAddress
);
router.post(
  "/",
  validate([
    body("username").notEmpty(),
    body("wallet").notEmpty().bail().isEthereumAddress(),
    ...requireSignature(),
  ]),
  onlySigned("wallet"),
  create
);
router.patch(
  "/:wallet",
  validate([
    param("wallet").notEmpty().bail().isEthereumAddress(),
    body("wallet").not().exists(),
    body("username").notEmpty(),
    ...requireSignature(),
  ]),
  onlySigned("wallet"),
  update
);
router.delete(
  "/:wallet",
  validate([
    param("wallet").notEmpty().bail().isEthereumAddress(),
    ...requireSignature(),
  ]),
  onlySigned("wallet"),
  remove
);

export = router;
