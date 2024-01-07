type PublicNetwork =
  | 'mainnet'
  | 'sepolia'
  | 'goerli'
  | 'xdai'
  | 'sokol'
  | 'fuse'
  | 'bsc'
  | 'bsctest'
  | 'fantom'
  | 'fantomtest'
  | 'moonbase'
  | 'moonriver'
  | 'moonbeam'
  | 'matic'
  | 'mumbai'
  | 'avalanche'
  | 'fuji'
  | 'optimism'
  | 'optimism-goerli'
  | 'optimism-sepolia'
  | 'arbitrum'
  | 'arbitrum-nova'
  | 'arbitrum-goerli'
  | 'arbitrum-sepolia'
  | 'celo'
  | 'alfajores'
  | 'harmony-s0'
  | 'harmony-test-s0'
  | 'aurora'
  | 'auroratest'
  | 'hedera'
  | 'hederatest'
  | 'zksync'
  | 'zksync-goerli'
  | 'base'
  | 'base-goerli'
  | 'base-sepolia'
  | 'linea'
  | 'linea-goerli'
  | 'mantle'
  | 'scroll'
  | 'scroll-sepolia'
  | 'meld'
  | 'meld-kanazawa';
type CustomNetwork = 'x-dfk-avax-chain' | 'x-dfk-avax-chain-test';
export type Network = PublicNetwork | CustomNetwork;
export declare const Networks: Network[];
export declare function isValidNetwork(text: string): text is Network;
export declare function fromChainId(chainId: number): Network | undefined;
export declare function toChainId(network: Network): number | undefined;
export {};
//# sourceMappingURL=network.d.ts.map
