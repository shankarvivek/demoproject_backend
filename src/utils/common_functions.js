const resultResponse = (res, statusCode, message, data = []) => {
    res.status(statusCode).send({ message, ...data });
};


export { resultResponse };