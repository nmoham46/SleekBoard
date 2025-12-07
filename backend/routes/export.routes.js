import express from "express";
import { exportUserStoriesToJira } from "../controllers/export.controller.js";

const router = express.Router();

router.get("/jira", exportUserStoriesToJira);

export default router;