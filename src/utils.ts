import moment = require("moment");

export const isDev = process.env.NODE_ENV === "development";

export const dbHost = isDev ? "mongodb://localhost/notebook" : `mongodb+srv://${process.env.DB_USER}:${encodeURI(process.env.DB_PASSWORD || "")}@cluster0-88j9k.mongodb.net/notebook?retryWrites=true&w=majority`

export const getNow = () => moment().format("DD-MM-YYYY HH:mm:ss");