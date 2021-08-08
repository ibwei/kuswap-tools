const { ethers } = require('ethers');
const { KCC } = require('../config/kcc.config');
const { KUSWAP_CONFIG } = require('../config/kuswap.config');
const { KUSWAP_FARM_ABI } = require('../config/kuswap.farm.abi');
const { KUSWAP_ABI } = require('../config/kuswap.abi');
class KuswapContract {
  constructor() {}

  static getFarmContract(provider) {
    return new ethers.Contract(KUSWAP_CONFIG.FARM, KUSWAP_FARM_ABI, provider);
  }

  static getRouter02Contract(provider) {
    return new ethers.Contract(KUSWAP_CONFIG.ROUTERV2, KUSWAP_ABI, provider);
  }
}

module.exports = {
  KuswapContract,
};
