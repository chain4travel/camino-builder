/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TokenB, TokenBInterface } from "../TokenB";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
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
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
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
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
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
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600681526020017f546f6b656e4200000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f544b42000000000000000000000000000000000000000000000000000000000081525081600390805190602001906200009692919062000248565b508060049080519060200190620000af92919062000248565b505050620000c76000801b33620000cd60201b60201c565b6200035d565b620000df8282620000e360201b60201c565b5050565b620000f58282620001d560201b60201c565b620001d15760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550620001766200024060201b60201c565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b600033905090565b828054620002569062000327565b90600052602060002090601f0160209004810192826200027a5760008555620002c6565b82601f106200029557805160ff1916838001178555620002c6565b82800160010185558215620002c6579182015b82811115620002c5578251825591602001919060010190620002a8565b5b509050620002d59190620002d9565b5090565b5b80821115620002f4576000816000905550600101620002da565b5090565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200034057607f821691505b60208210811415620003575762000356620002f8565b5b50919050565b612449806200036d6000396000f3fe608060405234801561001057600080fd5b506004361061012c5760003560e01c806340c10f19116100ad578063a217fddf11610071578063a217fddf14610369578063a457c2d714610387578063a9059cbb146103b7578063d547741f146103e7578063dd62ed3e146104035761012c565b806340c10f19146102b357806370a08231146102cf57806391d14854146102ff57806395d89b411461032f5780639dc29fac1461034d5761012c565b8063248a9ca3116100f4578063248a9ca3146101fd5780632f2ff15d1461022d578063313ce5671461024957806336568abe1461026757806339509351146102835761012c565b806301ffc9a71461013157806306fdde0314610161578063095ea7b31461017f57806318160ddd146101af57806323b872dd146101cd575b600080fd5b61014b600480360381019061014691906116f7565b610433565b604051610158919061173f565b60405180910390f35b6101696104ad565b60405161017691906117f3565b60405180910390f35b610199600480360381019061019491906118a9565b61053f565b6040516101a6919061173f565b60405180910390f35b6101b7610562565b6040516101c491906118f8565b60405180910390f35b6101e760048036038101906101e29190611913565b61056c565b6040516101f4919061173f565b60405180910390f35b6102176004803603810190610212919061199c565b61059b565b60405161022491906119d8565b60405180910390f35b610247600480360381019061024291906119f3565b6105bb565b005b6102516105dc565b60405161025e9190611a4f565b60405180910390f35b610281600480360381019061027c91906119f3565b6105e5565b005b61029d600480360381019061029891906118a9565b610668565b6040516102aa919061173f565b60405180910390f35b6102cd60048036038101906102c891906118a9565b61069f565b005b6102e960048036038101906102e49190611a6a565b6106bb565b6040516102f691906118f8565b60405180910390f35b610319600480360381019061031491906119f3565b610703565b604051610326919061173f565b60405180910390f35b61033761076e565b60405161034491906117f3565b60405180910390f35b610367600480360381019061036291906118a9565b610800565b005b61037161081c565b60405161037e91906119d8565b60405180910390f35b6103a1600480360381019061039c91906118a9565b610823565b6040516103ae919061173f565b60405180910390f35b6103d160048036038101906103cc91906118a9565b61089a565b6040516103de919061173f565b60405180910390f35b61040160048036038101906103fc91906119f3565b6108bd565b005b61041d60048036038101906104189190611a97565b6108de565b60405161042a91906118f8565b60405180910390f35b60007f7965db0b000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff191614806104a657506104a582610965565b5b9050919050565b6060600380546104bc90611b06565b80601f01602080910402602001604051908101604052809291908181526020018280546104e890611b06565b80156105355780601f1061050a57610100808354040283529160200191610535565b820191906000526020600020905b81548152906001019060200180831161051857829003601f168201915b5050505050905090565b60008061054a6109cf565b90506105578185856109d7565b600191505092915050565b6000600254905090565b6000806105776109cf565b9050610584858285610ba2565b61058f858585610c2e565b60019150509392505050565b600060056000838152602001908152602001600020600101549050919050565b6105c48261059b565b6105cd81610ea6565b6105d78383610eba565b505050565b60006012905090565b6105ed6109cf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161461065a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161065190611baa565b60405180910390fd5b6106648282610f9b565b5050565b6000806106736109cf565b905061069481858561068585896108de565b61068f9190611bf9565b6109d7565b600191505092915050565b6000801b6106ac81610ea6565b6106b6838361107d565b505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16905092915050565b60606004805461077d90611b06565b80601f01602080910402602001604051908101604052809291908181526020018280546107a990611b06565b80156107f65780601f106107cb576101008083540402835291602001916107f6565b820191906000526020600020905b8154815290600101906020018083116107d957829003601f168201915b5050505050905090565b6000801b61080d81610ea6565b61081783836111d4565b505050565b6000801b81565b60008061082e6109cf565b9050600061083c82866108de565b905083811015610881576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161087890611cc1565b60405180910390fd5b61088e82868684036109d7565b60019250505092915050565b6000806108a56109cf565b90506108b2818585610c2e565b600191505092915050565b6108c68261059b565b6108cf81610ea6565b6108d98383610f9b565b505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b60007f01ffc9a7000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916827bffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916149050919050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610a47576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3e90611d53565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610ab7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610aae90611de5565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610b9591906118f8565b60405180910390a3505050565b6000610bae84846108de565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610c285781811015610c1a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c1190611e51565b60405180910390fd5b610c2784848484036109d7565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610c9e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9590611ee3565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610d0e576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d0590611f75565b60405180910390fd5b610d198383836113a2565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610d9f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d9690612007565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610e8d91906118f8565b60405180910390a3610ea08484846113a7565b50505050565b610eb781610eb26109cf565b6113ac565b50565b610ec48282610703565b610f975760016005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550610f3c6109cf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45b5050565b610fa58282610703565b156110795760006005600084815260200190815260200160002060000160008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555061101e6109cf565b73ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16837ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b60405160405180910390a45b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156110ed576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110e490612073565b60405180910390fd5b6110f9600083836113a2565b806002600082825461110b9190611bf9565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516111bc91906118f8565b60405180910390a36111d0600083836113a7565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611244576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161123b90612105565b60405180910390fd5b611250826000836113a2565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050818110156112d6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112cd90612197565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081600260008282540392505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8460405161138991906118f8565b60405180910390a361139d836000846113a7565b505050565b505050565b505050565b6113b68282610703565b61142d576113c381611431565b6113d18360001c602061145e565b6040516020016113e292919061228b565b6040516020818303038152906040526040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161142491906117f3565b60405180910390fd5b5050565b60606114578273ffffffffffffffffffffffffffffffffffffffff16601460ff1661145e565b9050919050565b60606000600283600261147191906122c5565b61147b9190611bf9565b67ffffffffffffffff8111156114945761149361231f565b5b6040519080825280601f01601f1916602001820160405280156114c65781602001600182028036833780820191505090505b5090507f3000000000000000000000000000000000000000000000000000000000000000816000815181106114fe576114fd61234e565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a9053507f7800000000000000000000000000000000000000000000000000000000000000816001815181106115625761156161234e565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600060018460026115a291906122c5565b6115ac9190611bf9565b90505b600181111561164c577f3031323334353637383961626364656600000000000000000000000000000000600f8616601081106115ee576115ed61234e565b5b1a60f81b8282815181106116055761160461234e565b5b60200101907effffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff1916908160001a905350600485901c9450806116459061237d565b90506115af565b5060008414611690576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401611687906123f3565b60405180910390fd5b8091505092915050565b600080fd5b60007fffffffff0000000000000000000000000000000000000000000000000000000082169050919050565b6116d48161169f565b81146116df57600080fd5b50565b6000813590506116f1816116cb565b92915050565b60006020828403121561170d5761170c61169a565b5b600061171b848285016116e2565b91505092915050565b60008115159050919050565b61173981611724565b82525050565b60006020820190506117546000830184611730565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611794578082015181840152602081019050611779565b838111156117a3576000848401525b50505050565b6000601f19601f8301169050919050565b60006117c58261175a565b6117cf8185611765565b93506117df818560208601611776565b6117e8816117a9565b840191505092915050565b6000602082019050818103600083015261180d81846117ba565b905092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061184082611815565b9050919050565b61185081611835565b811461185b57600080fd5b50565b60008135905061186d81611847565b92915050565b6000819050919050565b61188681611873565b811461189157600080fd5b50565b6000813590506118a38161187d565b92915050565b600080604083850312156118c0576118bf61169a565b5b60006118ce8582860161185e565b92505060206118df85828601611894565b9150509250929050565b6118f281611873565b82525050565b600060208201905061190d60008301846118e9565b92915050565b60008060006060848603121561192c5761192b61169a565b5b600061193a8682870161185e565b935050602061194b8682870161185e565b925050604061195c86828701611894565b9150509250925092565b6000819050919050565b61197981611966565b811461198457600080fd5b50565b60008135905061199681611970565b92915050565b6000602082840312156119b2576119b161169a565b5b60006119c084828501611987565b91505092915050565b6119d281611966565b82525050565b60006020820190506119ed60008301846119c9565b92915050565b60008060408385031215611a0a57611a0961169a565b5b6000611a1885828601611987565b9250506020611a298582860161185e565b9150509250929050565b600060ff82169050919050565b611a4981611a33565b82525050565b6000602082019050611a646000830184611a40565b92915050565b600060208284031215611a8057611a7f61169a565b5b6000611a8e8482850161185e565b91505092915050565b60008060408385031215611aae57611aad61169a565b5b6000611abc8582860161185e565b9250506020611acd8582860161185e565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680611b1e57607f821691505b60208210811415611b3257611b31611ad7565b5b50919050565b7f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560008201527f20726f6c657320666f722073656c660000000000000000000000000000000000602082015250565b6000611b94602f83611765565b9150611b9f82611b38565b604082019050919050565b60006020820190508181036000830152611bc381611b87565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000611c0482611873565b9150611c0f83611873565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611c4457611c43611bca565b5b828201905092915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b6000611cab602583611765565b9150611cb682611c4f565b604082019050919050565b60006020820190508181036000830152611cda81611c9e565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b6000611d3d602483611765565b9150611d4882611ce1565b604082019050919050565b60006020820190508181036000830152611d6c81611d30565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b6000611dcf602283611765565b9150611dda82611d73565b604082019050919050565b60006020820190508181036000830152611dfe81611dc2565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b6000611e3b601d83611765565b9150611e4682611e05565b602082019050919050565b60006020820190508181036000830152611e6a81611e2e565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611ecd602583611765565b9150611ed882611e71565b604082019050919050565b60006020820190508181036000830152611efc81611ec0565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b6000611f5f602383611765565b9150611f6a82611f03565b604082019050919050565b60006020820190508181036000830152611f8e81611f52565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b6000611ff1602683611765565b9150611ffc82611f95565b604082019050919050565b6000602082019050818103600083015261202081611fe4565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b600061205d601f83611765565b915061206882612027565b602082019050919050565b6000602082019050818103600083015261208c81612050565b9050919050565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b60006120ef602183611765565b91506120fa82612093565b604082019050919050565b6000602082019050818103600083015261211e816120e2565b9050919050565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b6000612181602283611765565b915061218c82612125565b604082019050919050565b600060208201905081810360008301526121b081612174565b9050919050565b600081905092915050565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000600082015250565b60006121f86017836121b7565b9150612203826121c2565b601782019050919050565b60006122198261175a565b61222381856121b7565b9350612233818560208601611776565b80840191505092915050565b7f206973206d697373696e6720726f6c6520000000000000000000000000000000600082015250565b60006122756011836121b7565b91506122808261223f565b601182019050919050565b6000612296826121eb565b91506122a2828561220e565b91506122ad82612268565b91506122b9828461220e565b91508190509392505050565b60006122d082611873565b91506122db83611873565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff048311821515161561231457612313611bca565b5b828202905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600061238882611873565b9150600082141561239c5761239b611bca565b5b600182039050919050565b7f537472696e67733a20686578206c656e67746820696e73756666696369656e74600082015250565b60006123dd602083611765565b91506123e8826123a7565b602082019050919050565b6000602082019050818103600083015261240c816123d0565b905091905056fea2646970667358221220b9cf90b8ea05dd818307af9e22c3976198dfc02041d8ad21214479977b88386c64736f6c63430008090033";

export class TokenB__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TokenB> {
    return super.deploy(overrides || {}) as Promise<TokenB>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TokenB {
    return super.attach(address) as TokenB;
  }
  connect(signer: Signer): TokenB__factory {
    return super.connect(signer) as TokenB__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenBInterface {
    return new utils.Interface(_abi) as TokenBInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): TokenB {
    return new Contract(address, _abi, signerOrProvider) as TokenB;
  }
}