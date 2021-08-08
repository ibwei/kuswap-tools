const BN = require('bignumber.js');
const Job = require('./job');
const { getKusPrice } = require('./utils');
const { WalletUtils } = require('./wallet');

const autoWithdrawLpCondition = async () => {
  console.log('starting to run condition....');
  const priceResponse = await getKusPrice();
  if (priceResponse.status === 0) return false;
  if (new BN(priceResponse.price).lt(6)) {
    return true;
  }
  return fase;
};

// JOB 1
const AutoWithDrawLpTokenAndRemoveLiquidity = new Job(
  'AutoWithDrawLpTokenAndRemoveLiquidity',
  autoWithdrawLpCondition,
  [WalletUtils.withdrawLPToken.bind(null, 1)],
  false,
  1000 * 10
);

AutoWithDrawLpTokenAndRemoveLiquidity.start();
