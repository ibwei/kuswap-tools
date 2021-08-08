const KUSWAP_CONFIG = {
  ROUTERV2: '0xa58350d6dee8441aa42754346860e3545cc83cda',

  FARM: '0x0cc7fb3626c55ce4eff79045e8e7cb52434431d4',
  FACTORY: '0xAE46cBBCDFBa3bE0F02F463Ec5486eBB4e2e65Ae',
  SWAP: {
    DEADLINE:
      '00000000000000000000000000000000000000000000000000000000610e28a1',
  },
  TOKEN: {
    LP: '1ee6b0f7302b3c48c5fa89cd0a066309d9ac3584',
    KUS: '4a81704d8c16d9fb0d7f61b747d0b5a272badf14',
    USDT: '0039f574ee5cc39bdd162e9a88e3eb1f111baf48',
    KCS: '4446Fc4eb47f2f6586f9fAAb68B3498F86C07521',
  },
  /**
   *  凡是静态的基础类型则左补齐零至64长度。而动态类型则是右补齐零至64长度。
   *  归纳下常见的静态类型：uint，bool，Address，bytes[0-32]，
   *  动态数组类型：bytes，string，address[]，bytes32[].....
   */
  methods: {
    /*  uint amountOut,  (目标 token的数量)
        uint amountInMax, （被兑换的 Token 最低能兑换数量，也就是乘以滑点的数量）
        address[] calldata path,
        address to,  // 接收地址
        uint deadline */
    swapExactTokensForTokens: '0x38ed1739',
    withdrawFram: '0x441a3e70',
    deposit: '0xe2bbb158',
  },
};

module.exports = {
  KUSWAP_CONFIG,
};
