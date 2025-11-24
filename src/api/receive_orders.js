import { runQuery } from "../database/dbConfig.js";
import { resultResponse } from "../utils/common_functions.js";
import DBQueries from "../utils/queries.json" assert { type: 'json' };
import constants from "../utils/constants.json" assert { type: 'json' };
const { queries } = DBQueries;
const { compareWords } = constants;
const { successMessages, errorMessages } = constants.responseMessages;


export const receiveOrders = async (req, res) => {
    try {
        const { external_order_id, affiliate_id, amount, status } = { ...req.body, ...req.params, ...req.query };
        if (!external_order_id || !amount)
            return resultResponse(res, 400, errorMessages.dataRequiredToProcess, { external_order_id, amount });

        const orderResult = await runQuery(queries.insertOrders, [ external_order_id, affiliate_id || null, amount, 
            status || compareWords.RECEIVED 
        ]);
        if (!orderResult.success)
            return resultResponse(res, 500, errorMessages.database_error, orderResult.data);

        let latestID = await runQuery(queries.fetchLatestOrderID, []);
        if (!latestID.success)
            return resultResponse(res, 500, errorMessages.database_error, latestID.data);

        const orderId = latestID.data[0].orderID;

        const { success, data } = await runQuery(queries.fetchInternalPartnerData, []);
        if (!success)
            return resultResponse(res, 500, errorMessages.database_error, data);

        const affiliateMapping = {};

        for (let i = 0; i < data.length; i++) {
            let { tiktok_affirmation, internal_id } = data[i];
            affiliateMapping[tiktok_affirmation] = internal_id;
        }

        const internal_partner_id = affiliateMapping[affiliate_id];

        const commission_rate = 10.0;
        const commission_amount = (Number(amount) * commission_rate) / 100.0;

        const commissionResult = await runQuery(queries.insertCommissions, [ orderId, internal_partner_id, commission_rate, commission_amount, 
            compareWords.CALCULATED 
        ]);
        if (!commissionResult.success) 
            return resultResponse(res, 500, errorMessages.database_error, commissionResult.data);

        return resultResponse(res, 200, successMessages.Success, { 
            success: true, 
            order: { id: orderId, external_order_id, affiliate_id, amount }, 
            commission: { id: commissionResult.data.insertId, order_id: orderId, internal_partner_id, commission_rate, commission_amount } 
        });
    } catch (err) {
        console.error(err);
        return resultResponse(res, 500, errorMessages.something_went_wrong, err.message);
    }
};