import express from "express";
const router = express.Router();
import { reportsCommissions } from "./reports_commissions.js";
import { receiveOrders } from "./receive_orders.js";
import { tokenAuthorization } from "../middleware/tokenAuthorization.js";


router.post('/orders/receive', tokenAuthorization, receiveOrders);
router.get("/reports/commissions", tokenAuthorization, reportsCommissions);


export default router;