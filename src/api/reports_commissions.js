import { runQuery } from "../database/dbConfig.js";
import { resultResponse } from "../utils/common_functions.js";
import DBQueries from "../utils/queries.json" assert { type: 'json' };
import constants from "../utils/constants.json" assert { type: 'json' };
const { queries } = DBQueries;
const { compareWords } = constants;
const { successMessages, errorMessages } = constants.responseMessages;


export const reportsCommissions = async (req, res) => {
    try {
        let { page, limit, partner, search = '' } = { ...req.query, ...req.params, ...req.body };

        page = Math.max(1, parseInt(page || '1'));
        limit = Math.min(100, parseInt(limit || '20'));
        const offset = (page - 1) * limit;
        
        let where = `WHERE c.internal_partner_id LIKE '%${search}%' `;
        const params = [];
        if (partner) {
          where = where + compareWords.internalPartnerIDAddingQuery;
          params.push(partner);
        }

        const aggSql = queries.fetchCommissions + where;
        const aggRes = await runQuery(aggSql, params);
        if (!aggRes.success) 
            return resultResponse(res, 500, errorMessages.database_error, aggRes.data);

        const dataSql = `${queries.fetchAllData}${where} ORDER BY c.createdAt DESC LIMIT ? OFFSET ?;`;
        params.push(limit, offset);
        const dataRes = await runQuery(dataSql, params);
        if (!dataRes.success) 
            return resultResponse(res, 500, errorMessages.database_error, dataRes.data);

        return resultResponse(res, 200, successMessages.Success, { success: true, pagination: { page, limit }, 
            data: { commisions: dataRes.data, aggregated: aggRes.data[0] } 
        });
    } catch (err) {
        console.error(err);
        return resultResponse(res, 500, errorMessages.something_went_wrong, err.message);
    }
};