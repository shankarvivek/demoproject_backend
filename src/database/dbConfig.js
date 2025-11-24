import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql";
const { HOST, DATABASE, USER, PASSWORD, PORT, CONNECTIONLIMIT } = process.env;


let connection = mysql.createPool({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: PASSWORD,
    port: PORT,
    connectionLimit: CONNECTIONLIMIT,
    multipleStatements: true,
});


connection.getConnection((err, connection) => {
    if (err) {
        console.log("DB connection Error>>>>> ", err);
    }
    if (connection)
        connection.release();
    return;
});


const runQuery = async (query, params) => {
    return new Promise((resolve, reject) => {
        connection.query(query, params, async (err, resp) => {
            if (err)
                reject({ success: false, data: err });
            else if (resp)
                resolve({ success: true, data: resp });
            else
                reject({ success: false, data: "Error in running query." });
        })
    })
    .then((res) => { return res; })
    .catch((err) => { return err; })
};


export { connection, runQuery };