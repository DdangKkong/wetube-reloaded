import express from "express";
import { watch, getUpload, getEdit, postUpload, postEdit } from "../controllers/videoController";

const videoRouter = express.Router();

// videoRouter.route("/:id(\\d+)").get(watch);
videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/upload").get(getUpload).post(postUpload);


export default videoRouter;

