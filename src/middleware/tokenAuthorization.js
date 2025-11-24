import { resultResponse } from "../utils/common_functions.js";
import constants from "../utils/constants.json" assert { type: 'json' };
const { errorMessages } = constants.responseMessages;


export const tokenAuthorization = (req, res, next) => {
    try {
        const key = req.headers['x-api-key'];
        if (!key || key !== process.env.API_KEY)
            return resultResponse(res, 401, errorMessages.unauthorizedUser);

        next();
    } catch (error) {
        console.log(errorMessages.tryCatchError, error);
        return resultResponse(res, 500, errorMessages.tryCatchError, error.message);
    }
};