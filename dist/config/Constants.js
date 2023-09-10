"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.repository = exports.redisKeys = void 0;
exports.redisKeys = {
    STOCKS: "stocks",
};
exports.repository = {
    JSON_FILE: "./assets/stocks.json",
    JSON_AWS: "https://test-stocks-data.s3.us-east-2.amazonaws.com/stocksData.json",
    POSTGRES: {
        TABLE_NAME: "stocks",
        INITIAL_VALUES: [
            {
                name: "AABA",
                price: "2.432",
            },
            {
                name: "AAL",
                price: "20.517",
            },
            {
                name: "AAME",
                price: "16.1896",
            },
        ],
    },
};
