export const redisKeys = {
  STOCKS: "stocks",
};

export const repository = {
  JSON_FILE: "./assets/stocks.json",
  JSON_AWS:
    "https://test-stocks-data.s3.us-east-2.amazonaws.com/stocksData.json",
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
