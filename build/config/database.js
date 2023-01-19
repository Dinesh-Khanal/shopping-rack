"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnect = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mongoose_1.default
        .connect(process.env.DB_URI)
        .then((data) => console.log(`MongoDb connected to host ${data.connection.host}`))
        .catch((err) => console.log(err.message));
};
exports.default = dbConnect;
