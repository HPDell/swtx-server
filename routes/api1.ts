import * as express from "express";
import { nearpeople } from "./api/nearpeople";

var router = express.Router();
router.use("/nearpeople", nearpeople);

export { router };