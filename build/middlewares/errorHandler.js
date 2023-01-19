"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../utils/appError"));
const ErrorHandler = (err, _req, res, _next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = "Resource not found.";
        err = new appError_1.default(message, 400);
    }
    // Wrong JWT error
    if (err.name === "JsonWebTokenError") {
        const message = `Json Web Token is invalid, Try again `;
        err = new appError_1.default(message, 400);
    }
    // JWT EXPIRE error
    if (err.name === "TokenExpiredError") {
        const message = `Json Web Token is Expired, Try again `;
        err = new appError_1.default(message, 400);
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
exports.default = ErrorHandler;
