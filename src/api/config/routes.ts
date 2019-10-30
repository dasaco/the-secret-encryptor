import { Express } from "express";
import index from "../controllers/index";

export default (app: Express) => {
  app.get("/", index.getIndex);
}