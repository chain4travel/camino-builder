/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { ITokenB, ITokenBInterface } from "../ITokenB";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export class ITokenB__factory {
  static readonly abi = _abi;
  static createInterface(): ITokenBInterface {
    return new utils.Interface(_abi) as ITokenBInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ITokenB {
    return new Contract(address, _abi, signerOrProvider) as ITokenB;
  }
}
