import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './src/api/index.js';
import constants from "./src/utils/constants.json" assert { type: 'json' };
const { SEVERPORT } = process.env;
dotenv.config();
const app = express();


app.use(cors(), express.json({ limit: "200mb" }));

app.use("/api-test", (req, res) => {
    return res.status(200).send(constants.welcomeNote);
});

app.use("/api", router);

app.listen(SEVERPORT, () => {
    console.log(`Affiliate backend running on port ${SEVERPORT}`); 
});
