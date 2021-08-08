const CoinGecko = require('coingecko-api');

const CoinGeckoClient = new CoinGecko();

const getKusPrice = async () => {
  try {
    let data = await CoinGeckoClient.coins.fetch('kuswap');
    return { price: data.data.tickers[1].last, status: 1 };
  } catch (e) {
    return { price: `Failed Reason:${e}`, status: 0 };
  }
};

module.exports = {
  getKusPrice,
};
